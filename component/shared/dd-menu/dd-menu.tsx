import { FC, Fragment, JSX, ReactNode } from 'react'
import Link from 'next/link'
import { RectangleEllipsis } from 'lucide-react'
import { Button,  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "component/ui"

interface DDMenuItem {
    label         : string | JSX.Element | ReactNode
    href         ?: string
    icon         ?: JSX.Element
    className    ?: string
    withSeparator?: boolean
    onClick      ?: () => void
}
interface DDMenuProps {
    menuItems      : DDMenuItem[]
    title          : string | JSX.Element | ReactNode
    menuIcon      ?: JSX.Element
    buttonLabel   ?: string
    buttonIconSize?: number
    variant       ?: ButtonVariant
    className     ?: string
    align         ?: 'start' | 'end'
    onClick       ?: () => void
}
const DDMenu: FC<DDMenuProps> = ({ menuItems, menuIcon, title, className, variant = 'ghost', align = 'end', buttonLabel, buttonIconSize = 20 }) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant={variant} className={className}>
        {buttonLabel && <span className="sr-only">{buttonLabel}</span>}
        {menuIcon ? menuIcon : <RectangleEllipsis size={buttonIconSize} />}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={align}>
      <DropdownMenuLabel>{title}</DropdownMenuLabel>
      <DropdownMenuSeparator />
        {menuItems?.map((item, index) => (
            <Fragment key={index}>
                <DropdownMenuItem onClick={item.onClick} className={item.className}>
                    {item.icon && item.icon} <span>{item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>
                </DropdownMenuItem>
                {item?.withSeparator && <DropdownMenuSeparator />}
            </Fragment>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DDMenu
