import { getMyBagCount } from 'lib/action'
import { auth } from 'vieux-carre.authenticate'
import { ThemeToggle, MobileMenu, UserMenu, BagIconWithBadge } from 'component/shared'

interface ToolbarProps {
  moduleType: ModuleType
}

const Toolbar: React.FC<ToolbarProps> = async ({ moduleType }) => {
  const count   = await getMyBagCount()
  const session = await auth()
  const user    = session?.user

  return (
    <div className={"flex justify-end gap-3"}>
      <nav className={"hidden md:flex w-full max-w-xs gap-2"}>
        <ThemeToggle />
        <BagIconWithBadge itemCount={count} />
        <UserMenu />
      </nav>
      <MobileMenu user={user as User} count={count} moduleType={moduleType} />
    </div>
  )
}

export default Toolbar
