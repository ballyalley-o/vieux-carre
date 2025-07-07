'use server'

import { z } from 'zod'
import { GLOBAL } from 'vieux-carre'
import { Prisma } from 'vieux-carre.authenticate/generated'
import { auth, signIn, signOut } from 'vieux-carre.authenticate'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendResetPasswordLink } from 'mailer'
import { prisma } from 'db/prisma'
import { cache, invalidateCache } from 'lib/cache'
import { CACHE_KEY, CACHE_TTL } from 'config/cache.config'
import { checkSignInThrottle, resetSignInAttempts, incrementSignInAttempts } from 'lib/throttle'
import { ShippingAddressSchema, PaymentMethodSchema } from 'lib/schema'
import { SystemLogger } from 'lib/app-logger'
import { PATH_DIR } from 'config'
import { CODE } from 'lib/constant'
import { transl } from 'lib/util'

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
  return cache({
    key    : CACHE_KEY.users(page),
    ttl    : CACHE_TTL.users,
    fetcher: async () => {
      const queryFilter: Prisma.UserWhereInput = query && query !== 'all' ? {
        OR: [
              { name: { contains: query, mode: 'insensitive' } as Prisma.StringFilter },
              { email: { contains: query, mode: 'insensitive' } as Prisma.StringFilter },
              // { role: { contains: query, mode: 'insensitive' } as Prisma.StringFilter },
            ]} : {}
      const users = await prisma.user.findMany({ where: { ...queryFilter }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit })
      const count = await prisma.user.count({ where: { ...queryFilter } })

      const summary = { data: users, totalPages: Math.ceil(count / limit) }
      return summary
    }
  })
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
export async function signInWithCredentials(data: SignIn) {

    const { email, password } = data
    const user                = await prisma.user.findUnique({ where: { email }})

    if (!user || !user.password) {
      return SystemLogger.response(false, transl('error.invalid_credentials'), CODE.NOT_FOUND, {})
    }

    const clientCookies       = cookies()
    const rawIp               = (await clientCookies).get('client-ip')?.value || 'unknown'
    const ipHash              = crypto.createHash('sha256').update(rawIp).digest('hex')
    const REDIS_KEY           = `${GLOBAL.REDIS.KEY}${email}:${ipHash}`

    await bcrypt.compare(password, user.password)

    const { SIGNIN_TTL, SIGNIN_ATTEMPT_MAX } = GLOBAL.LIMIT
    const now                                = new Date()
    const blockThreshold                     = SIGNIN_ATTEMPT_MAX * 4

    if (user.isBlocked) {
      return SystemLogger.errorMessage(transl('error.account_locked'), CODE.FORBIDDEN, TAG)
    }

    const { isBlocked, secondsLeft } = await checkSignInThrottle(REDIS_KEY)
    if (isBlocked) {
      const minutes = Math.floor(secondsLeft / 60)
      const seconds = secondsLeft % 60

      if (!user.isBlocked && user.failedSignInAttempts >= blockThreshold) {
        await prisma.user.update({ where: { email }, data: { isBlocked: true } })
        return SystemLogger.errorMessage(transl('error.account_locked'), CODE.TOO_MANY_REQUESTS, TAG)
      }
      await prisma.user.update({
        where: { email },
        data : { failedSignInAttempts: { increment: 1 }, lastFailedAttempt: new Date() }
      })
      return SystemLogger.errorMessage(transl('error.too_many_attempt', { min: minutes, sec: seconds }), CODE.TOO_MANY_REQUESTS, TAG)
    }

    const withinDBWindow = user.failedSignInAttempts >= SIGNIN_ATTEMPT_MAX && user.lastFailedAttempt && now.getTime() - user.lastFailedAttempt.getTime() < SIGNIN_TTL

    if (withinDBWindow) {
      if (!user.isBlocked) {
        await prisma.user.update({ where: { email }, data: { isBlocked: true } })
      }
      return SystemLogger.errorMessage(transl('error.account_locked'), CODE.TOO_MANY_REQUESTS, TAG)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user
    try {
      await signIn('credentials', { email, password, redirect: false })
      await resetSignInAttempts(REDIS_KEY)
      if (user) {
        await prisma.user.update({ where: { email }, data: { failedSignInAttempts: 0, lastFailedAttempt: null } })
      }
      return SystemLogger.response(true, transl('success.user_welcomeback', { user: safeUser.name ?? 'User' }), CODE.OK, safeUser)
    } catch (error) {
      console.error(error)
      await incrementSignInAttempts(REDIS_KEY)
      if (user) {
        await prisma.user.update({
          where: { email },
          data : { failedSignInAttempts: { increment: 1 }, lastFailedAttempt: new Date() }
        })
      }
      const _errorMessage = transl('error.invalid_credentials')
      return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
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
export async function signUpUser(data: SignUp) {
  try {
    const { name, email, password } = data

    if (!name || !email || !password) {
      const _errorMessage = transl('error.validation_error', { error: 'missing fields' })
      return SystemLogger.response(false, _errorMessage, CODE.BAD_REQUEST, {})
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      const _errorMessage = transl('error.exists_default', { document: email })
      return SystemLogger.response(false, _errorMessage, CODE.CONFLICT, {})
    }

    const hashedPassword = await bcrypt.hash(password, GLOBAL.HASH.SALT_ROUNDS)
    const user           = await prisma.user.create({ data: { name, email, password: hashedPassword } })

    await signIn('credentials', { email, password, redirect: false })

    const _message = transl('success.user_welcome', { user: name })
    return SystemLogger.response(true, _message, CODE.CREATED, user)
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
 return cache({
  key    : CACHE_KEY.userById(userId),
  ttl    : CACHE_TTL.userById,
  fetcher: async () => {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) throw new Error(transl('error.user_not_found'))
    return user
  }
 })
}

/**
 * Handles a password reset request by verifying the email and sending a reset link.
 *
 * @param data - The submitted form data containing the user's email.
 * @returns A system logger response, or a generic response if the user doesn't exist.
 */
export async function sendPasswordResetEmail(data: { email: string }) {
  try {
    const email = data.email
    const user  = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return SystemLogger.errorResponse(transl('error.user_not_found'), CODE.NOT_FOUND)
    }

    const existingToken = await prisma.passwordResetToken.findFirst({ where: { userId: user.id, expiresAt: { gt: new Date() }}})
    if (existingToken) {
      return SystemLogger.response(false, transl('error.exists_reset_password'), CODE.OK, TAG)
    }

    const token     = crypto.randomBytes(32).toString('hex')
    const expiresAt = GLOBAL.LIMIT.RESET_PASSWORD_LINK_EXPIRY

    await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } })

    await sendResetPasswordLink({ resetLink: PATH_DIR.PASSWORD_RESET(token), userEmail: email })
    return SystemLogger.response(true, transl('success.password_reset_sent'), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse((error as AppError).message, CODE.BAD_REQUEST, TAG)
  }
}


/**
 * Resets the user's password using the token
 *
 * @param data - Object containing token, new password, and confirm password
 * @returns A system logger response, or a generic response if the user doesn't exist.
 */
export async function resetPasswordWithToken(data: { token: string, password: string, confirmPassword: string}) {
  try {
    const { token, password, confirmPassword } = data

    if (password !== confirmPassword) {
      throw new Error(transl('error.password_mismatch'))
    }

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token }})
    if (!resetToken) {
      throw new Error(transl('error.invalid_token'))
    }

    const now = new Date()
    if (resetToken.expiresAt < now) {
      throw new Error(transl('error.expired_token'))
    }

    const user = await prisma.user.findUnique({ where: { id: resetToken.userId }})

    if (!user) {
      throw new Error(transl('error.user_not_found'))
    }

    const hashedPassword = await bcrypt.hash(password, GLOBAL.HASH.SALT_ROUNDS)

    await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword }})
    await prisma.passwordResetToken.delete({ where: { token }})

    return SystemLogger.response(true, transl('success.password_updated'), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Validates the token, and return the user in response
 *
 * @param data - Object containing the token
 * @returns A system logger response, or a generic response.
 */
export async function getResetPasswordTokenUser(data: { token: string }) {
  try {
    const { token } = data
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })

    if (!resetToken) {
      throw new Error(transl('error.invalid_token'))
    }

    const now = new Date()
    if (resetToken.expiresAt < now) {
      throw new Error(transl('error.expired_token'))
    }

    const user = await prisma.user.findUnique({ where: { id: resetToken.userId }})

    if (!user) {
      throw new Error(transl('error.user_not_found'))
    }

    return SystemLogger.response(true, transl('success.valid_token'), CODE.OK, { email: user.email })
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
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
    const session     = await auth()
    const currentUser = await prisma.user.findFirst({where: {id:session?.user?.id}})
    if(!currentUser) throw new Error(transl('error.user_not_found'))

    const parsedAddress = ShippingAddressSchema.parse(address)
    await prisma.user.update({where: { id: currentUser.id },data: { address: parsedAddress }})
    revalidatePath(PATH_DIR.USER.ACCOUNT)
    return SystemLogger.response(true, transl('success.user_address_updated', { user: currentUser.name ?? 'User' }), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

  /**
 * Updates the password of the current user.
 *
 * @param {UpdateUserPassword} data - Object containing the passwords.
 * @returns {Promise<{AppResponse}>} - A promise that resolves when the password is successfully updated.
 * @throws {Error} - Throws an error if the user is not found or if there is an issue with updating the password.
 */
export async function updateUserPassword(data: UpdateUserPassword) {
  try {
    const session     = await auth()
    const userId      = session?.user?.id
    const currentUser = await prisma.user.findFirst({ where: { id: userId } })
    if (!currentUser) throw new Error(transl('error.user_not_found'))

    const isMatch = await bcrypt.compare(data.oldPassword || '', currentUser.password || '')
    if (!isMatch) {
      return SystemLogger.response(false, transl('validation.password.invalid_old'))
    }

    const newPassword = await bcrypt.hash(data.password || '', GLOBAL.HASH.SALT_ROUNDS)
    await prisma.user.update({ where: { id: currentUser.id }, data: { password: newPassword } })
    revalidatePath(PATH_DIR.USER.ACCOUNT)
    return SystemLogger.response(true, transl('success.password_updated'), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

  /**

/**
 * Updates the payment method of the current user.
 *
 * @param paymentType - The payment method type to be updated, validated against the PaymentMethodSchema.
 * @returns A promise that resolves to a success response if the update is successful, or an error response if it fails.
 * @throws Will throw an error if the current user is not found or if there is an issue with the update process.
 */
export async function updateUserPaymentMethod(paymentType: z.infer<typeof PaymentMethodSchema>) {
  try {
    const session     = await auth()
    const currentUser = await prisma.user.findFirst({ where:{ id:session?.user?.id }})
    if (!currentUser) throw new Error(transl('error.user_not_found'))
    const { type } = PaymentMethodSchema.parse(paymentType)
    await prisma.user.update({ where: { id: currentUser.id }, data: { paymentMethod: type } })
    return SystemLogger.response(true, transl('success.user_updated'), CODE.OK, TAG)
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
    if (!currentUser) throw new Error(transl('error.user_not_found'))
    const updatedUser = await prisma.user.update({ where:{ id: currentUser.id }, data: { name: user.name, email: user.email, address: user.address }})
    await invalidateCache(CACHE_KEY.userById(updatedUser.id))
    revalidatePath(PATH_DIR.USER.ACCOUNT)
    return SystemLogger.response(true, transl('success.user_updated'), CODE.OK, updatedUser)
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
    if (!user) throw new Error(transl('error.user_not_found'))

    const updatedUser = await prisma.user.update({ where:{ id: user.id }, data: { name: data.name, role: data.role }})
    await invalidateCache(CACHE_KEY.userById(updatedUser.id))
    revalidatePath(PATH_DIR.ADMIN.USER_VIEW(user.id))
    return SystemLogger.response(true, transl('success.user_updated') , CODE.OK, updatedUser)
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
    await invalidateCache(CACHE_KEY.userById(userId))
    revalidatePath(PATH_DIR.ADMIN.USER)
    return SystemLogger.response(true, transl('success.user_deleted'), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
