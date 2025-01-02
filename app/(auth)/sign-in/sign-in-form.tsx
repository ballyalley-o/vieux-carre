import { Label, Input, Button } from 'component'
import { PATH_DIR } from 'config'
import { KEY, signInDefaultValue } from 'lib'
import Link from 'next/link'
const SignInForm = () => {
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">{'Email'}</Label>
          <Input id={KEY.EMAIL} name={KEY.EMAIL} type={KEY.EMAIL} autoComplete={KEY.EMAIL} defaultValue={signInDefaultValue.email} required />
        </div>
        <div>
          <Label htmlFor="password">{'Password'}</Label>
          <Input
            id={KEY.PASSWORD}
            name={KEY.PASSWORD}
            type={KEY.PASSWORD}
            autoComplete={KEY.PASSWORD}
            defaultValue={signInDefaultValue.password}
            required
          />
        </div>
        <div className="">
          <Button className="w-full rounded-sm" variant="default">
            {'Sign In'}
          </Button>
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
