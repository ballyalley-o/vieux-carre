import { z } from 'zod'
import { SignInSchema, SignUpSchema, UpdateUserPasswordSchema } from 'lib'

declare global {
    export type SignIn             = z.infer<typeof SignInSchema>
    export type SignUp             = z.infer<typeof SignUpSchema>
    export type UpdateUserPassword = z.infer<typeof UpdateUserPasswordSchema>
}

export {}