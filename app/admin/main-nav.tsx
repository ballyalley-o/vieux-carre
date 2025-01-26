"use client"
import { HTMLAttributes } from 'react'
import { cn } from 'lib'
import { ProtectedNavLink } from 'component/shared/protect'
import { NAV_CONFIG_ADMIN } from 'config/nav-config'

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {NAV_CONFIG_ADMIN.map((item, index) => (
        <ProtectedNavLink key={index} href={item.href}>
          {item.title}
        </ProtectedNavLink>
      ))}
    </nav>
  )
}

export default MainNav
