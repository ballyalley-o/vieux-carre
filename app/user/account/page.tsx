import { Metadata } from 'next'
import { auth } from 'auth'
import { en } from 'public/locale'
import { SessionProvider} from 'next-auth/react'
import AccountForm from './account-form'

export const metadata: Metadata = { title: 'Account' }

const UserAccountPage = async () => {
  const session = await auth()
  return <SessionProvider session={session}>
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="h2-bold">
      {en.navigation.account.label}
      </h2>
      <AccountForm />
    </div>
  </SessionProvider>
}

export default UserAccountPage
