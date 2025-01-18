import { ReactNode } from 'react'
import { GLOBAL } from 'vieux-carre'
import Image from 'next/image'
import Link from 'next/link'
import { Toolbar } from 'component/shared'
import { ASSET_DIR, PATH_DIR } from 'config'
import { LOGO } from 'config/layout'
import MainNav from './main-nav'

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col">
      <div className="border-b container mx-auto">
        <div className="flex items-center h-16 px-4">
          <Link href={PATH_DIR.ROOT} className={'w-22'}>
            <Image src={ASSET_DIR.LOGO_RED} height={LOGO.NAV_ADMIN_H} width={LOGO.NAV_ADMIN_W} alt={GLOBAL.APP_NAME} />
          </Link>
          <MainNav className={'mx-6'}/>
          <div className="ml-auto items-center flex space-x-4">
            <Toolbar />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
        {children}
      </div>
    </div>
  )
}
