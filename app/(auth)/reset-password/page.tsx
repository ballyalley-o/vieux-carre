import { Metadata } from 'next'
import { PATH_DIR } from 'vc.dir'
import { redirect } from 'next/navigation'
import { getResetPasswordTokenUser } from 'lib/action'
import { Card, CardHeader, CardContent, Label } from 'component/ui'
import { AppLogo } from 'component/shared/app'
import { transl } from 'lib'
import ResetPasswordForm from './reset-password-form'

export const metadata: Metadata = { title: transl('sign_in.label') }

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams

  let email = ''
  if (token) {
    const response    = await getResetPasswordTokenUser({ token })
    if (response.success) {
      const data  = response.data as { email: string }
            email = data.email
    } else {
      redirect(PATH_DIR.PASSWORD_FORGOT)
    }
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className={'shadow-none border-none'}>
        <CardHeader className={'flex justify-center items-center space-y-4'}>
          <AppLogo />
          <Label className={'text-xl text-gray-500'}>{transl('change_password.label')}</Label>
        </CardHeader>
        <CardContent className={'space-y-4 my-4'}>
          <ResetPasswordForm token={token || ''} verifiedUserEmail={email} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
