'use client'
import Image from 'next/image'
import { Button } from 'component'
import { ASSET_DIR, HTTP_RESPONSE } from 'config'
import { CODE } from 'lib'

const NotFoundPage = () => {
  const handleNavigateHome = () => (window.location.href = '/')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" suppressHydrationWarning>
      <Image src={ASSET_DIR.LOGO_RED} width={48} height={48} alt="logo" priority />
      <div className="p-6 w-1/3 rounded-sm shadow-sm text-center">
        <h4 className="text-lg mt-2">{CODE.NOT_FOUND}</h4>
        <h1 className="text-3xl font-bold mb-4">{HTTP_RESPONSE[404].title}</h1>
        <h6 className="mt-8">{HTTP_RESPONSE[404].description}</h6>
        <Button variant="outline" className="mt-4 ml-2" onClick={handleNavigateHome}>
          {'Go Back'}
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
