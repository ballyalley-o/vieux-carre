'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface NoScrollBtnProps {
  href      : string
  children  : ReactNode
  className?: string
}

export default function NoScrollBtn({ href, children, className = '' }: NoScrollBtnProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(href, { scroll: false })
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
