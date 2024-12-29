'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBagIcon, User2Icon } from 'lucide-react'
import { ThemeToggle } from 'component'
import { Button } from 'component/ui'
import { GLOBAL, ICON_DIR, PATH_DIR } from 'config'

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image src={ICON_DIR.LOGO} alt="logo" width={24} height={24} priority />
            <span className="hidden lg:block ml-3">{GLOBAL.APP_NAME}</span>
          </Link>
        </div>
        <div className="space-x-2">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href={PATH_DIR.CART}>
              <ShoppingBagIcon /> Bag
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={PATH_DIR.SIGN_IN}>
              <User2Icon /> Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
