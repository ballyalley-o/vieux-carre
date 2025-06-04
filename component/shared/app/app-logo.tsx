import Link from 'next/link'
import Image from 'next/image'
import { GLOBAL } from 'vieux-carre'
import { PATH_DIR, ASSET_DIR } from 'config/dir'
import { ICON } from 'config/layout'
import { cn } from 'lib'

const AppLogo = () => {
    return (
      <div className={'flex flex-row justify-center items-center p-5'}>
        <Link href={PATH_DIR.ROOT} className={cn('flex-center relative')}>
          <Image src={ASSET_DIR.LOGO_RED} alt="logo" width={ICON.XXXTRA_LARGE} height={ICON.XXXTRA_LARGE} priority style={{ objectFit: 'contain' }} />
        </Link>
        <span className={'ml-3 text-lg text-left'}>
          <p className={'text-4xl font-bold'}>{GLOBAL.APP_NAME}</p>
        </span>
      </div>
    )
}

export default AppLogo