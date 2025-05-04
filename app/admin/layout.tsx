import { ReactNode } from 'react'
import { GLOBAL } from 'vieux-carre'
import Image from 'next/image'
import Link from 'next/link'
import { Toolbar } from 'component/shared'
import { AdminSearch } from 'component/admin'
import { ASSET_DIR, PATH_DIR } from 'config'
import { LOGO } from 'config/layout'
import MainNav from './main-nav'

const MODULE = 'admin'
export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <header className="flex  h-screen flex-col">
      <header className="w-full border-b">
        <div className="wrapper flex-center">
          <Link href={PATH_DIR.ROOT} className={'w-22'}>
            <Image src={ASSET_DIR.LOGO_BLK} height={LOGO.NAV_H} width={LOGO.NAV_W} alt={GLOBAL.APP_NAME} />
          </Link>
          <MainNav className={'mx-6'} />
          <div className="ml-auto items-center flex">
            <div>
              <AdminSearch />
            </div>
            <Toolbar moduleType={MODULE} />
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
        <div className={'layout-wrapper'}>{children}</div>
      </div>
    </header>
  )
}
