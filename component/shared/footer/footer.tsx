import { GLOBAL } from 'vieux-carre'
import { ASSET_DIR, PATH_DIR } from 'vc.dir'
import { LOGO } from 'config/layout'
import Link from 'next/link'
import Image from 'next/image'
import { transl } from 'lib'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={'border-t text-md'}>
      <div className={'flex flex-col md:flex-row justify-center text-center md:justify-between wrapper-nav'}>
        <div className={'p-2 md:p-5'}>
          &copy; | {currentYear} | {GLOBAL.APP_NAME} | {transl('legal.copyright_notice')}
        </div>
        <div className={'p-2 md:p-5 flex items-center justify-center gap-2'}>
          <Link href={PATH_DIR.LEGAL.TERMS_OF_USE} className={'underline'}>{transl('legal.terms_of_use')}</Link> |
          <Link href={PATH_DIR.LEGAL.PRIVACY_POLICY} className={'underline'}>{transl('legal.privacy_policy')}</Link>
          <Image src={ASSET_DIR.LOGO_GRAY} alt="logo" width={LOGO.HEADER_LOGO_W} height={LOGO.HEADER_LOGO_H} priority className={'opacity-30 ml-5'} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
