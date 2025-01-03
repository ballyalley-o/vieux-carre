'use server'
import { SignInSchema } from 'lib/schema'
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
