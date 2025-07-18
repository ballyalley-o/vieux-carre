'use client'

import { ASSET_DIR,  } from 'vc.dir'
import Image from 'next/image'
import { Button } from 'component/ui'
import { CODE } from 'lib/constant'
import { transl, HTTP_RESPONSE } from 'lib'

const NotFoundPage = () => {
  const handleNavigateHome = () => (window.location.href = '/')
  return (
    <div className={"flex flex-col items-center justify-center min-h-screen shadow-none"}>
      <Image src={ASSET_DIR.LOGO_RED} width={48} height={48} alt="logo" priority />
      <div className={"p-6 w-1/3 rounded-sm text-center"}>
        <h4 className={"text-lg mt-2"}>{CODE.NOT_FOUND}</h4>
        <h1 className={"text-3xl font-bold mb-4"}>{HTTP_RESPONSE[404].title}</h1>
        <h6 className={"mt-8"}>{HTTP_RESPONSE[404].description}</h6>
        <Button variant="outline" className={"mt-4 ml-2"} onClick={handleNavigateHome}>
          {transl('go_back')}
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
