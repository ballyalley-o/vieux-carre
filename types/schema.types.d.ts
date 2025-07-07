import { z } from 'zod'
import { SignInSchema, SignUpSchema, UpdateUserSchema, UpdateUserPasswordSchema, UpdateUserAccountSchema, ForgotPasswordSchema, ResetPasswordSchema } from 'lib'

declare global {
    export type ForgotPassword     = z.infer<typeof ForgotPasswordSchema>
    export type ResetPassword      = z.infer<typeof ResetPasswordSchema>
    export type SignIn             = z.infer<typeof SignInSchema>
    export type SignUp             = z.infer<typeof SignUpSchema>
    export type UpdateUser         = z.infer<typeof UpdateUserSchema>
    export type UpdateUserPassword = z.infer<typeof UpdateUserPasswordSchema>
    export type UpdateUserAccount  = z.infer<typeof UpdateUserAccountSchema>
    export type ShippingAddress    = z.infer<typeof ShippingAddressSchema>

}

export {}