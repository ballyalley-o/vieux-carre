import { getMyBagCount } from 'lib/action'
import { auth } from 'auth'
import { ThemeToggle, MobileMenu, UserMenu, BagIconWithBadge } from 'component/shared'

const Toolbar = async () => {
  const count   = await getMyBagCount()
  const session = await auth()
  const user    = session?.user

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggle />
        <BagIconWithBadge itemCount={count}/>
        <UserMenu />
      </nav>
      <MobileMenu user={user as User} count={count} />
    </div>
  )
}

export default Toolbar
