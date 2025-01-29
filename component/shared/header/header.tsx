import Image from 'next/image'
import { ProtectedNavLink } from 'component/shared/protect'
import { Toolbar } from 'component'
import { CategoryDrwr, Search } from 'component/shared'
import { GLOBAL, ASSET_DIR, PATH_DIR } from 'config'
import { LOGO } from 'config/layout'

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrwr />
          <ProtectedNavLink href={PATH_DIR.ROOT} className={'flex-start ml-4'}>
            <Image src={ASSET_DIR.LOGO_RED} alt="logo" width={LOGO.HEADER_LOGO_W} height={LOGO.HEADER_LOGO_H} priority />
            <span className="hidden lg:block ml-3">{GLOBAL.APP_NAME}</span>
          </ProtectedNavLink>
        </div>
        <div className="hidden md:block">
          <Search/>
        </div>
        <Toolbar />
      </div>
    </header>
  )
}

export default Header
