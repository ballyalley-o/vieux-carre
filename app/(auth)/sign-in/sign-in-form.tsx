'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { signInWithCredentials } from 'lib/action'
import { Shell } from 'lucide-react'
import Link from 'next/link'
import { Button } from 'component/ui/button'
import { Input } from 'component/ui/input'
import { Label } from 'component/ui/label'
import { PATH_DIR } from 'config'
import { KEY, RESPONSE, signInDefaultValue } from 'lib'

const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, RESPONSE.DEFAULT)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <div className="mb-5">
        <Button disabled={pending} className="w-full" variant={'default'}>
          {pending ? <Shell className="loader mr-2" /> : 'Sign In'}
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
            defaultValue={signInDefaultValue.password}
            className="rounded-sm"
            required
          />
        </div>
        <div className="">
          <SignInButton />
        </div>
        <div className="text-sm text-center text-muted-foreground">
          {`Don't have an account? `}
          <Link href={PATH_DIR.SIGN_UP} target="_self" className="link font-bold">
            {'Sign Up'}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignInForm
