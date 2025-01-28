/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { PATH_DIR } from 'config'
import { Button, Input } from 'component/ui'
import { en } from 'public/locale'

const AdminSearch = () => {
  const pathname                    = usePathname()
  const searchParams                = useSearchParams()
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '')

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '')
  }, [searchParams])

  const { PRODUCT }   = PATH_DIR.ADMIN
  const formActionUrl = (Object.entries(PATH_DIR.ADMIN).find(([key, value]) => typeof value === 'string' && pathname.includes(value))?.[1] as string) ?? PRODUCT

  return (
    <form action={formActionUrl} method={'GET'}>
      <Input
        type={'search'}
        placeholder={en.search.placeholder}
        name={'query'}
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className={'md:w-[100px] lg:w-[300px]'}
      />
      <Button type={'submit'} className={'sr-only'}>
        {en.search.label}
      </Button>
    </form>
  )
}

export default AdminSearch
