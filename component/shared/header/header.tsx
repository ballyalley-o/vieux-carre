'use client'
import Image from 'next/image'
import Link from 'next/link'
// import { useTheme } from 'next-themes'
import { Toolbar } from 'component'
import { GLOBAL, ASSET_DIR } from 'config'

const Header = () => {
  // const { theme } = useTheme()
  // const logoModes = theme === 'dark' ? ASSET_DIR.LOGO_DARK : theme === 'light' ? ASSET_DIR.LOGO : ASSET_DIR.LOGO_RED
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image src={ASSET_DIR.LOGO_RED} alt="logo" width={24} height={24} priority />
            <span className="hidden lg:block ml-3">{GLOBAL.APP_NAME}</span>
          </Link>
        </div>
        <Toolbar />
      </div>
    </header>
  )
}

export default Header
