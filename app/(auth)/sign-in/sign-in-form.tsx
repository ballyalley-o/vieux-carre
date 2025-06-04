'use client'

import { useActionState, useState } from 'react'
import { en } from 'public/locale'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { signInWithCredentials } from 'lib/action'
import Link from 'next/link'
import { Button } from 'component/ui/button'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { GoogleSignInBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { Separatr } from 'component/shared/separatr'
import { PATH_DIR } from 'config/dir'
import { KEY, RESPONSE, signInDefaultValue } from 'lib'

const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, RESPONSE.DEFAULT)
  const [oAuth, setOAuth] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <Button disabled={pending} className="w-full" variant={'default'}>
          {pending ? <EllipsisLoader /> : en.sign_in.label}
        </Button>
      </div>
    )
  }
  const renderDataMessage = data && !data.success && <div className="text-center text-destructive">{data.message}</div>
  return (
    <form action={action}>
      <input type="hidden" name={KEY.CALLBACK_URL} value={callbackUrl} />
      {renderDataMessage}
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">{'Email'}</Label>
          <Input
            id={KEY.EMAIL}
            name={KEY.EMAIL}
            type={KEY.EMAIL}
            autoComplete={KEY.EMAIL}
            defaultValue={signInDefaultValue.email}
            disabled={oAuth}
            className={'rounded-sm'}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">{'Password'}</Label>
          <Input
            id={KEY.PASSWORD}
            name={KEY.PASSWORD}
            type={KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            defaultValue={signInDefaultValue.password}
            disabled={oAuth}
            className={'rounded-sm'}
            required
          />
        </div>
        <div>
          <SignInButton />
          <Separatr label={en.or.label} />
          <GoogleSignInBtn setOAuth={setOAuth} />
        </div>
        <div className="text-sm text-center text-muted-foreground">
          {en.dont_have_account.label}
          <Link href={PATH_DIR.SIGN_UP} target="_self" className="link font-bold">
            &nbsp;{en.sign_up.label}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignInForm
