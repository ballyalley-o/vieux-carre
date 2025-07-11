import { ReactNode } from 'react'
import { GLOBAL } from 'vieux-carre'
import { Promotion } from 'vieux-carre.authenticate/generated'
import { ASSET_DIR, PATH_DIR } from 'vc.dir'
import Image from 'next/image'
import { CategoryDrwr, Search, Toolbar } from 'component/shared'
import { LinkBtn } from 'component/shared/btn'
import { PromoSwiper } from 'component/shared/promo'
import { ProtectedNavLink } from 'component/shared/protect'
import { LOGO } from 'config/layout'
import { cn, transl } from 'lib/util'
import { getDealOfTheMonthProductSlug, getPromotionsByType } from 'lib'

const BarWrapper = ({ children, className }: { children: ReactNode, className?: string }) => (
  <div className={cn('max-w-[100rem] mx-auto flex items-center justify-center md:justify-between', className)}>
    {children}
  </div>
)

const TopBar = () => (
  <div className={'bg-white text-black dark:bg-gray-700 dark:text-white text-center text-sm py-2'}>
    <BarWrapper>
      <p>{transl('message.disclaimer.demo')}</p>
      <ProtectedNavLink href={PATH_DIR.SUPPORT} className={'hidden md:block flex-start ml-4'}>
        <p className={"hidden lg:block ml-3"}>{transl('help_centre.label')}</p>
      </ProtectedNavLink>
    </BarWrapper>
  </div>
)

const BottomBar = ({ promos, promotionProductSlug }: { promos: Promotion[], promotionProductSlug: string }) => (
  <div className={'bg-black text-white dark:bg-background dark:text-white text-center text-sm py-2'}>
    <BarWrapper className={'justify-evenly'}>
      <LinkBtn href={PATH_DIR.SEARCH} variant={'outline'} className={'bg-transparent hidden md:flex items-center ml-4'}>
        <p className={"hidden lg:block ml-3 text-xl layout-wrapper font-bold"}>{'SHOP NOW'}</p>
      </LinkBtn>
      <div className={'w-full overflow-hidden'}><PromoSwiper promos={promos} /></div>
      <LinkBtn href={PATH_DIR.PRODUCT_VIEW(promotionProductSlug)} variant={'outline'} className={'bg-transparent hidden md:flex items-center ml-4'}>
          <p className={"hidden lg:block text-xl font-bold"}>{'DEAL of the MONTH'}</p>
        </LinkBtn>
    </BarWrapper>
  </div>
)

const Header = async () => {
  const [promos, promotionProduct] = await Promise.all([getPromotionsByType('SWIPER'), getDealOfTheMonthProductSlug()])
  return (
    <div className={'sticky top-0 z-40'}>
      <TopBar />
      <header className={'w-full bg-background'}>
        <div className={'wrapper-nav flex-between'}>
          <div className="flex-start">
            <CategoryDrwr />
            <ProtectedNavLink href={PATH_DIR.ROOT} className={'flex-start ml-4'}>
              <Image src={ASSET_DIR.LOGO_RED} alt="logo" width={LOGO.HEADER_LOGO_W} height={LOGO.HEADER_LOGO_H} priority />
              <span className={'hidden lg:block ml-3'}>{GLOBAL.APP_NAME}</span>
            </ProtectedNavLink>
          </div>
          <div className="hidden md:block">
            <Search />
          </div>
          <Toolbar moduleType={'user'} />
        </div>
      </header>
      <BottomBar promos={promos} promotionProductSlug={promotionProduct?.slug || ''} />
    </div>
  )
}

export default Header
