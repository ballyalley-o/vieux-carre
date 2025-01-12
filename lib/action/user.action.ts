'use server'
import { en } from 'public/locale'
import { hashSync } from 'bcrypt-ts-edge'
import { ShippingAddressSchema, SignInSchema, SignUpSchema } from 'lib/schema'
import { prisma } from 'db/prisma'
import { auth, signIn, signOut } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { SystemLogger } from 'lib/app-logger'
import { CODE, RESPONSE } from 'lib/constant'

const TAG = 'USER.ACTION'

export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = SignInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })
    await signIn('credentials', user)
    return RESPONSE.SUCCESS('Signed In')
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return RESPONSE.ERROR('Invalid credentials', CODE.BAD_REQUEST)
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
    return RESPONSE.SUCCESS('User Signed Up')
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return RESPONSE.ERROR_FORMATTED(error as AppError, CODE.BAD_REQUEST)
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({where: {id: userId}})
  if (!user) throw new Error('User not found')
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