import { Metadata } from 'next'
import { auth } from 'vieux-carre.authenticate'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'component'
import { AppLogo } from 'component/shared/app'
import { PATH_DIR } from 'config/dir'
import { transl } from 'lib/util/translate'
import SignUpForm from './sign-up-form'

export const metadata: Metadata = { title: transl('sign_up.label') }

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}
const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const session = await auth()
  const { callbackUrl } = await searchParams
  if (session) {
    redirect(callbackUrl || PATH_DIR.ROOT)
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-none border-none">
        <CardHeader className="space-y-4">
          <AppLogo />
          <CardTitle className="text-center">{transl('create_account.description')}</CardTitle>
          <CardDescription className="text-center">{transl('sign_up.description')}</CardDescription>
          <CardContent className="space-y-4">
            <SignUpForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default SignUpPage
