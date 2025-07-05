import { SessionProvider} from 'next-auth/react'
import { Metadata } from 'next'
import { auth } from 'vieux-carre.authenticate'
import { AccountForm } from 'component/shared'
import { getUserById, transl } from 'lib'

export const metadata: Metadata = { title: transl('account.label') }

const UserAccountPage = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error(transl('error.user_not_found'))
  const user = await getUserById(userId)

  return <SessionProvider session={session}>
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="h2-bold">
      {transl('navigation.account.label')}
      </h2>
      <AccountForm user={user as User} />
    </div>
  </SessionProvider>
}

export default UserAccountPage
