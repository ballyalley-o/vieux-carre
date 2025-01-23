import { getMyBagCount } from 'lib/action'
import { ThemeToggle, MobileMenu, UserMenu, BagIconWithBadge } from 'component/shared'

const Toolbar = async () => {
  const count = await getMyBagCount()
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggle />
        <BagIconWithBadge itemCount={count}/>
        <UserMenu />
      </nav>
      <MobileMenu />
    </div>
  )
}

export default Toolbar
