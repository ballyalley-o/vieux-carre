import { SessionProvider} from 'next-auth/react'
import { Metadata } from 'next'
import { auth } from 'vieux-carre.authenticate'
import { getUserById, transl, formatDateTime } from 'lib'
import { Badge } from 'component/ui'
import AccountForm from 'app/user/account/account-form'
import AccountChangePasswordForm from 'app/user/account/account-change-password-form'

export const metadata: Metadata = { title: transl('account.label') }

const UserAccountPage = async () => {
  const session = await auth()
  const userId  = session?.user?.id

  if (!userId) throw new Error(transl('error.user_not_found'))
  const user = await getUserById(userId)

  return (
  <SessionProvider session={session}>
    <div className={"min-w-md mx-auto space-y-8"}>
      <h2 className={"h2-bold"}>{transl('navigation.account.label')}</h2>
      <div className={'flex flex-col justify-start w-full md:w-[400px] space-y-5'}>
        <AccountForm user={user as User} />
        <div className={'p-5 border border-gray-400/30 rounded-md'}>
          <AccountChangePasswordForm />
        </div>
      </div>
      <div className="flex justify-start align-center items-center gap-2 mt-5">
        <p className={'text-muted-foreground'}>{transl('last_updated_at.label')}</p><span><Badge variant={'secondary'} className={'w-auto'}>{formatDateTime(user?.updatedAt).dateTime}</Badge></span>
      </div>
    </div>
  </SessionProvider>
  )
}

export default UserAccountPage
