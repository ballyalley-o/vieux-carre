import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component'
import { PATH_DIR, ASSET_DIR } from 'config'
import SignInForm from './sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In'
}

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl: string }>
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams
  const session = await auth()
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
          <CardDescription className="text-center">{'Sign in to your account'}</CardDescription>
          <CardContent className="space-y-4">
            <SignInForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default SignInPage
