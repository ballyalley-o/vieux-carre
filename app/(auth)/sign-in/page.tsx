import { Metadata } from 'next'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component'
import { AppLogo } from 'component/shared/app'
import { PATH_DIR } from 'config/dir'
import { transl } from 'lib/util/translate'
import SignInForm from './sign-in-form'

export const metadata: Metadata = { title: transl('sign_in.label') }

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams
  const session         = await auth()
  if (session) {
    redirect(callbackUrl || PATH_DIR.ROOT)
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-none border-none">
        <CardHeader className="space-y-4">
          <AppLogo />
          <CardDescription className={'text-center'}>{transl('sign_in.description')}</CardDescription>
          <CardContent className={'space-y-4'}>
            <SignInForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default SignInPage
