import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'component'
import { PATH_DIR, ASSET_DIR } from 'config'
import SignUpForm from './sign-up-form'

export const metadata: Metadata = {
  title: 'Sign Up'
}

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
          <Link href={PATH_DIR.ROOT} className="flex-center">
            <Image src={ASSET_DIR.LOGO_RED} height={70} width={70} alt={'logo'} />
          </Link>
          <CardTitle className="text-center">{'Create an account'}</CardTitle>
          <CardDescription className="text-center">{'Fill up the your information below to Sign Up'}</CardDescription>
          <CardContent className="space-y-4">
            <SignUpForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default SignUpPage
