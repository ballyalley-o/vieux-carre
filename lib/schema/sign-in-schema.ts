import { z } from 'zod'

export const SignInSchema = z.object({
  email   : z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password is required')
})
