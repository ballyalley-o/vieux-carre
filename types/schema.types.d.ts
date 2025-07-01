export {}

declare global {
    export type SignIn = z.infer<typeof SignInSchema>
    export type SignUp = z.infer<typeof SignUpSchema>
}