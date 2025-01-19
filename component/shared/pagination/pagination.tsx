'use client'
import { FC } from 'react'
import { en } from 'public/locale'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from 'component/ui'
import { formUrlQuery } from 'lib'

interface PaginationProps {
  page: number | string
  totalPages: number
  urlParamName?: string
}
const Pagination: FC<PaginationProps> = ({ page, totalPages, urlParamName }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (direction: 'prev' | 'next') => {
    const pageValue = direction === 'prev' ? Number(page) - 1 : Number(page) + 1
    const newUrl = formUrlQuery({ params: searchParams.toString(), key: urlParamName || 'page', value: pageValue.toString() })
    router.push(newUrl)
  }
  return (
    <div className={'flex gap-2'}>
      <Button
        variant={'ghost'}
        size={'sm'}
        className={'w-28 px-0 group relative flex items-center'}
        disabled={Number(page) <= 1}
        onClick={() => handleClick('prev')}>
        <ArrowLeft className={'default-size_icon -right-5 opacity-100 translate-x-[100%] ease-in-out group-hover:translate-x-5 group-hover:opacity-0'} />
        <p className="ml-2 absolute right-0 translate-x-[100%] opacity-0 whitespace-nowrap rounded px-2 py-1 text-black text-sm transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          {en.previous.label}
        </p>
      </Button>
      <Button
        variant={'ghost'}
        size={'sm'}
        className={'w-28 px-0 group relative flex items-center'}
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick('next')}>
        <ArrowRight className={'default-size_icon opacity-100 translate-x-[-100%] ease-in-out group-hover:translate-x-5 group-hover:opacity-0'} />
        <p className="ml-2 absolute left-0 translate-x-[-100%] opacity-0 whitespace-nowrap rounded px-2 py-1 text-black text-sm transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          {en.next.label}
        </p>
      </Button>
    </div>
  )
}

export default Pagination
