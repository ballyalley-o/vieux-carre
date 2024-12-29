'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  Button
} from 'component/ui'
import { capitalize, KEY } from 'lib'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const renderIcon = () => {
    if (theme === 'dark') {
      return <MoonIcon />
    }
    if (theme === 'light') {
      return <SunIcon />
    }
    return <SunMoon />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="focus-visible:ring-0 focus-visible:ring-offset-0">
          {renderIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{'Appearance'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={theme === KEY.SYSTEM} onClick={() => setTheme(KEY.SYSTEM)}>
          {capitalize(KEY.SYSTEM)}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === KEY.LIGHT} onClick={() => setTheme(KEY.LIGHT)}>
          {capitalize(KEY.LIGHT)}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === KEY.DARK} onClick={() => setTheme(KEY.DARK)}>
          {capitalize(KEY.DARK)}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
