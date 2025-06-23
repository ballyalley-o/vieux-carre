import { PATH_DIR } from 'vc.dir'
import Link from 'next/link'
import { transl } from 'lib/util'
import { RedirType } from './app.types'

interface AppAuthRedir {
  type: RedirType
}

const AppAuthRedir = ({ type }: AppAuthRedir) => {
  return (
    <div className={'text-sm text-center text-muted-foreground'}>
      {transl(type === 'sign-up' ? 'already_have_account.label' : 'dont_have_account.label')}
      <Link href={PATH_DIR[type === 'sign-up' ? 'SIGN_IN' : 'SIGN_UP']} target="_self" className={'link font-bold'}>
        &nbsp;{transl(`${type === 'sign-in' ? 'sign_up' : 'sign_in'}.label`)}
      </Link>
      {/* {type === 'sign-in' && (
        <span>
          <Link href={PATH_DIR.PASSWORD_FORGOT} target="_self" className={'link font-bold'}>
            &nbsp; | &nbsp; {transl('form.forgot_password.placeholder')}
          </Link>
        </span>
      )} */}
    </div>
  )
}

export default AppAuthRedir
