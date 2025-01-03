import Link from 'next/link'
import { ShoppingBagIcon } from 'lucide-react'
import { ThemeToggle, Button, MobileMenu, UserMenu } from 'component'
import { PATH_DIR } from 'config'

const Toolbar = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggle />
        <Button asChild variant="ghost">
          <Link href={PATH_DIR.BAG}>
            <ShoppingBagIcon /> {'Bag'}
          </Link>
        </Button>
        <UserMenu />
      </nav>
      <MobileMenu />
    </div>
  )
}

export default Toolbar
