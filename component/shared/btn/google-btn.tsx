'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { ASSET_DIR } from 'config/dir'
import { ICON } from 'config/layout'
import { transl } from 'lib/util'

interface GoogleSignInBtnProps {
  loading  : boolean
  disabled?: boolean
  onClick ?: () => void
}
const GoogleSignInBtn = ({ disabled, loading, onClick }: GoogleSignInBtnProps) => {
  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick?.()
    signIn('google', { prompt: 'select_account', callbackUrl: '/' })
  }
  return (
    <div className={'my-5'}>
      <Button className={'w-full'} disabled={loading || disabled} onClick={handleSignIn}>
        {loading ? (
          <EllipsisLoader />
        ) : (
          <div className={'flex items-center gap-2'}>
            <Image src={ASSET_DIR.ICON.GOOGLE} width={ICON.SMALL} height={ICON.SMALL} alt={'google-icon'} />
            <span>{transl('sign_in.google')}</span>
          </div>
        )}
      </Button>
    </div>
  )
}

export default GoogleSignInBtn