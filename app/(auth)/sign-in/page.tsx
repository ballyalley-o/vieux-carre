import { Metadata } from 'next'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardDescription, CardContent } from 'component'
import { PATH_DIR, ASSET_DIR } from 'config'
import SignInForm from './sign-in-form'
import { cn } from 'lib'
import { ICON } from 'config/layout'

export const metadata: Metadata = { title: en.sign_in.label }

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
          <div className={'flex flex-row justify-center items-center p-5'}>
            <Link href={PATH_DIR.ROOT} className={cn('flex-center relative')}>
              <Image src={ASSET_DIR.LOGO_RED} alt="logo" width={ICON.XXXTRA_LARGE} height={ICON.XXXTRA_LARGE} priority style={{ objectFit: 'contain' }} />
            </Link>
            <span className={'ml-3 text-lg text-left'}>
              <p className={'text-4xl font-bold'}>{GLOBAL.APP_NAME}</p>
            </span>
          </div>
          <CardDescription className={'text-center'}>{en.sign_in.description}</CardDescription>
          <CardContent className={'space-y-4'}>
            <SignInForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default SignInPage
