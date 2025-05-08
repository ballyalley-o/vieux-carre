import Image from 'next/image'
import { CategoryDrwr, Search, Toolbar } from 'component/shared'
import { ProductCarousel } from 'component/shared/product'
import { ProtectedNavLink } from 'component/shared/protect'
import { GLOBAL, ASSET_DIR, PATH_DIR } from 'config'
import { LOGO } from 'config/layout'

interface HeaderProps {
  products: Product[]
}

const Header: React.FC<HeaderProps> = ({ products }) => {
  return (
    <header className={'w-full'}>
      <div className={"wrapper flex-between"}>
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
      {products.length > 0 && (
        <div className="w-screen overflow-hidden">
          <ProductCarousel products={products} />
        </div>
      )}
    </header>
  )
}

export default Header
