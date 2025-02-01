'use server'
import { en } from 'public/locale'
import { z } from 'zod'
import { GLOBAL } from 'vieux-carre'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { hash } from 'lib/encrypt'
import { ShippingAddressSchema, SignInSchema, SignUpSchema, PaymentMethodSchema } from 'lib/schema'
import { prisma } from 'db/prisma'
import { auth, signIn, signOut } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { SystemLogger } from 'lib/app-logger'
import { PATH_DIR } from 'config'
import { CODE } from 'lib/constant'

const TAG = 'USER.ACTION'

/**
 * Retrieves a paginated list of users from the database.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} [params.limit=GLOBAL.PAGE_SIZE] - The number of users to retrieve per page.
 * @param {number} params.page - The current page number.
 * @returns {Promise<{ data: Array<User>, totalPages: number }>} A promise that resolves to an object containing the list of users and the total number of pages.
 */
export async function getAllUsers({ limit = GLOBAL.PAGE_SIZE, page, query }: AppUser<number>) {
  const queryFilter: Prisma.UserWhereInput = query && query !== 'all' ? {
    OR: [
          { name: { contains: query, mode: 'insensitive' } as Prisma.StringFilter },
          { email: { contains: query, mode: 'insensitive' } as Prisma.StringFilter },
          { role: { contains: query, mode: 'insensitive' } as Prisma.StringFilter },
        ]} : {}
  const users = await prisma.user.findMany({ where: { ...queryFilter }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit })
  const count = await prisma.user.count({ where: { ...queryFilter } })

  const summary = { data: users, totalPages: Math.ceil(count / limit) }
  return summary
}

/**
 * Signs in a user with the provided credentials.
 *
 * @param prevState - The previous state, which is currently not used.
 * @param formData - The form data containing the user's email and password.
 * @returns A promise that resolves to a success response if the sign-in is successful,
 * or an error response if the credentials are invalid.
 * @throws Will throw an error if a redirect error occurs.
 */
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = SignInSchema.parse({
      email   : formData.get('email'),
      password: formData.get('password')
    })
    await signIn('credentials', user)
    return SystemLogger.response(en.success.user_signed_in, CODE.OK, TAG)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return SystemLogger.errorMessage(en.error.invalid_credentials, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Signs out the current user by calling the `signOut` function.
 *
 * @returns {Promise<void>} A promise that resolves when the sign-out process is complete.
 */
export async function signOutUser() {
  await signOut()
}

/**
 * Signs up a new user with the provided form data.
 *
 * @param prevState - The previous state, which is not used in this function.
 * @param formData - The form data containing user information.
 * @returns A promise that resolves to a system logger response indicating the result of the sign-up process.
 * @throws Will throw an error if the sign-up process encounters a redirect error.
 */
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = SignUpSchema.parse({
      name           : formData.get('name'),
      email          : formData.get('email'),
      password       : formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    })
    const unhashedPassword = user.password
    user.password = await hash(user.password)
    await prisma.user.create({ data: { name: user.name, email: user.email, password: user.password } })
    await signIn('credentials', { email: user.email, password: unhashedPassword })
    return SystemLogger.response(en.success.user_signed_up, CODE.CREATED, TAG)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Retrieves a user by their unique identifier.
 *
 * @param userId - The unique identifier of the user to retrieve.
 * @returns The user object if found.
 * @throws Will throw an error if the user is not found.
 */
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({ where: {id: userId }})
  if (!user) throw new Error(en.error.user_not_found)
  return user
}

/**
 * Updates the address of the current user.
 *
 * @param {ShippingAddress} address - The new shipping address to be updated.
 * @returns {Promise<void>} - A promise that resolves when the address is successfully updated.
 * @throws {Error} - Throws an error if the user is not found or if there is an issue with updating the address.
 */
export async function updateUserAddress(address: ShippingAddress) {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({where: {id:session?.user?.id}})
    if(!currentUser) throw new Error(en.error.user_not_found)

    const parsedAddress = ShippingAddressSchema.parse(address)
    await prisma.user.update({where: {id: currentUser.id},data: {address: parsedAddress}})
    return SystemLogger.response(`${currentUser.name} address updated`, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates the payment method of the current user.
 *
 * @param paymentType - The payment method type to be updated, validated against the PaymentMethodSchema.
 * @returns A promise that resolves to a success response if the update is successful, or an error response if it fails.
 * @throws Will throw an error if the current user is not found or if there is an issue with the update process.
 */
export async function updateUserPaymentMethod(paymentType: z.infer<typeof PaymentMethodSchema>) {
  try {
    const session =  await auth()
    const currentUser = await prisma.user.findFirst({ where:{ id:session?.user?.id }})
    if (!currentUser) throw new Error(en.error.user_not_found)
    const { type } = PaymentMethodSchema.parse(paymentType)
    await prisma.user.update({ where: { id: currentUser.id }, data: { paymentMethod: type } })
    return SystemLogger.response(en.success.user_updated, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates the user account with the provided user information.
 *
 * @param {UserBase} user - The user information to update.
 * @returns {Promise<any>} The updated user information or an error response.
 *
 * @throws {Error} If the current user is not found.
 */
export async function updateUserAccount(user: UserBase) {
  try {
    const session     = await auth()
    const userId      = session?.user?.id
    const currentUser = await prisma.user.findFirst({ where: { id: userId }})
    if (!currentUser) throw new Error(en.error.user_not_found)
    const updatedUser = await prisma.user.update({ where:{ id: currentUser.id }, data: { name: user.name, email: user.email }})
    revalidatePath(PATH_DIR.USER.ACCOUNT)
    return SystemLogger.response(en.success.user_updated, CODE.OK, TAG, '', updatedUser)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates a user account with the provided data.
 *
 * @param {UpdateUserAccount} data - The data to update the user account with.
 * @returns {Promise<SystemLogger>} - The result of the update operation.
 * @throws {Error} - Throws an error if the user is not found.
 */
export async function updateUser(data: UpdateUserAccount) {
  try {
    const user = await prisma.user.findFirst({ where: { id: data.id }})
    if (!user) throw new Error(en.error.user_not_found)

    const updatedUser = await prisma.user.update({ where:{ id: user.id }, data: { name: data.name, role: data.role }})
    revalidatePath(PATH_DIR.ADMIN.USER_VIEW(user.id))
    return SystemLogger.response(en.success.user_updated, CODE.OK, TAG, '', updatedUser)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Deletes a user by their user ID.
 *
 * This function first checks if the user exists by attempting to delete a product with the given user ID.
 * If the user does not exist, it throws an error indicating that the user was not found.
 * If the user exists, it proceeds to delete the user from the database.
 * After deleting the user, it revalidates the admin user path.
 *
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {Promise<SystemLogger>} - A promise that resolves to a success response if the user is deleted,
 * or an error response if an error occurs.
 *
 * @throws {Error} If the user does not exist.
 */
export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({ where: { id: userId } })

    revalidatePath(PATH_DIR.ADMIN.USER)
    return SystemLogger.response(en.success.user_deleted, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
