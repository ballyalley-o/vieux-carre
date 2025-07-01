import Image from 'next/image'
import { CategoryDrwr, Search, Toolbar } from 'component/shared'
import { ProtectedNavLink } from 'component/shared/protect'
import { GLOBAL, ASSET_DIR, PATH_DIR } from 'config'
import { LOGO } from 'config/layout'

const Header = () => {
  return (
    <header className={'sticky top-0 z-40 w-full bg-background'}>
      <div className={'wrapper flex-between'}>
        <div className="flex-start">
          <CategoryDrwr />
          <ProtectedNavLink href={PATH_DIR.ROOT} className={'flex-start ml-4'}>
            <Image src={ASSET_DIR.LOGO_RED} alt="logo" width={LOGO.HEADER_LOGO_W} height={LOGO.HEADER_LOGO_H} priority />
            <span className="hidden lg:block ml-3">{GLOBAL.APP_NAME}</span>
          </ProtectedNavLink>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <Toolbar moduleType={'user'} />
      </div>
      {/* TODO: add a folding carousel when scrolled or folded and when hovered it expands. */}
    </header>
  )
}

export default Header
