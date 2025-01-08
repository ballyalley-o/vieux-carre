'use server'
import { hashSync } from 'bcrypt-ts-edge'
import { SignInSchema, SignUpSchema } from 'lib/schema'
import { prisma } from 'db/prisma'
import { signIn, signOut } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { CODE, RESPONSE } from 'lib/constant'

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
