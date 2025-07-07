import { Metadata } from 'next'
import { auth } from 'vieux-carre.authenticate'
import { PATH_DIR } from 'vc.dir'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardContent } from 'component/ui'
import { Label } from 'component/ui/label'
import { AppLogo } from 'component/shared/app'
import { transl } from 'lib/util'
import ForgotPasswordForm from './forgot-password-form'

export const metadata: Metadata = { title: transl('sign_in.label') }

interface ForgotPasswordPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}

const ForgotPasswordPage = async ({ searchParams }: ForgotPasswordPageProps) => {
  const { callbackUrl } = await searchParams
  const session         = await auth()
  if (session) {
    redirect(callbackUrl || PATH_DIR.ROOT)
  }
  return (
    <div className="w-full max-w-md mx-auto">
        <Card className={'shadow-none border-none'}>
          <CardHeader className={'flex justify-center items-center space-y-4'}>
            <AppLogo />
            <Label className={'text-xl text-gray-500'}>{transl('reset_password.label')}</Label>
          </CardHeader>
          <CardContent className={'space-y-4 my-4'}>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
    </div>
  )
}

export default ForgotPasswordPage
