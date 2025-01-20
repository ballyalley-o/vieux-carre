"use client"
import { HTMLAttributes } from 'react'
import Link from 'next/link'
// import { en } from 'public/locale'
import { usePathname } from 'next/navigation'
import { cn } from 'lib'
import { NAV_CONFIG_ADMIN } from 'config/nav-config'

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {NAV_CONFIG_ADMIN.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn('text-sm font-medium transition-colors hover:text-primary', pathname.includes(item.href) ? '' : 'text-muted-foreground')}>
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
