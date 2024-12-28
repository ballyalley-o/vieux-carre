import Image from 'next/image'
import Link from 'next/link'
// import { ShoppingBagIcon, UserIcon } from 'lucide-react'
// import { Button } from 'component/ui'
import { GLOBAL, ICON_DIR } from 'config'

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start ml-4">
            <div className="bg-red-800">
              <Image src={ICON_DIR.LOGO} alt="logo" width={24} height={24} priority />
            </div>
            <span className="hidden lg:block font-bold text-2xl ml-3">{GLOBAL.APP_NAME}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
