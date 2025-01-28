'use server'
import { en } from 'public/locale'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { hashSync } from 'bcrypt-ts-edge'
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
export async function getAllUsers({ limit=  GLOBAL.PAGE_SIZE, page }: AppPageAction<number>) {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit })
  const count = await prisma.user.count()

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
      email: formData.get('email'),
      password: formData.get('password')
    })
    await signIn('credentials', user)
    return SystemLogger.response(en.success.user_signed_in, CODE.OK, TAG)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return SystemLogger.errorResponse(en.error.invalid_credentials, CODE.BAD_REQUEST, TAG)
  }
}

export async function signOutUser() {
  await signOut()
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = SignUpSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    })
    const unhashedPassword = user.password
    user.password = hashSync(user.password, 10)
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

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({ where: {id: userId }})
  if (!user) throw new Error(en.error.user_not_found)
  return user
}

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