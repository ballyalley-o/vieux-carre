'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { en } from 'public/locale'
import Image from 'next/image'
import { Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { ASSET_DIR } from 'config/dir'
import { ICON } from 'config/layout'

interface GoogleSignInBtnProps {
    setOAuth: React.Dispatch<React.SetStateAction<boolean>>
}
const GoogleSignInBtn = ({ setOAuth }: GoogleSignInBtnProps) => {
  const [loading, setLoading] = useState(false)
  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOAuth(true)
    setLoading(true)
    signIn('google', { callbackUrl: '/' })
  }
  return (
    <div className={'my-5'}>
      <Button className={'w-full'} disabled={loading} onClick={handleSignIn}>
        {loading ? (
          <EllipsisLoader />
        ) : (
          <div className={'flex items-center gap-2'}>
            <Image src={ASSET_DIR.ICON.GOOGLE} width={ICON.SMALL} height={ICON.SMALL} alt={'google-icon'} />
            <span>{en.sign_in.google}</span>
          </div>
        )}
      </Button>
    </div>
  )
}

export default GoogleSignInBtn