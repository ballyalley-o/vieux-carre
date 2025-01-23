'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { en } from 'public/locale'
import { useSearchParams } from 'next/navigation'
import { signUpUser } from 'lib/action/user.action'
import Link from 'next/link'
import { Button } from 'component/ui/button'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { EllipsisLoader } from 'component/shared/loader'
import { PATH_DIR } from 'config'
import { KEY, RESPONSE, signUpDefaultValue } from 'lib'

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, RESPONSE.DEFAULT)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <Button disabled={pending} className="w-full" variant={'default'}>
          {pending ? <EllipsisLoader /> : en.sign_up.label}
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
          <Label htmlFor={KEY.NAME}>{'Name'}</Label>
          <Input
            id={KEY.NAME}
            name={KEY.NAME}
            type={KEY.TEXT}
            autoComplete={KEY.NAME}
            defaultValue={signUpDefaultValue.name}
            className="rounded-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">{'Email'}</Label>
          <Input
            id={KEY.EMAIL}
            name={KEY.EMAIL}
            type={KEY.EMAIL}
            autoComplete={KEY.EMAIL}
            defaultValue={signUpDefaultValue.email}
            className="rounded-sm"
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
            defaultValue={signUpDefaultValue.password}
            className="rounded-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor={KEY.CONFIRM_PASSWORD}>{'Confirm Password'}</Label>
          <Input
            id={KEY.CONFIRM_PASSWORD}
            name={KEY.CONFIRM_PASSWORD}
            type={KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            defaultValue={signUpDefaultValue.confirmPassword}
            className="rounded-sm"
            required
          />
        </div>
        <div className="">
          <SignUpButton />
        </div>
        <div className="text-sm text-center text-muted-foreground">
          {en.already_have_account.label}
          <Link href={PATH_DIR.SIGN_IN} target="_self" className="link font-bold">
            {en.sign_in.label}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
