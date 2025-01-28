import { ReactNode, FC } from 'react'
import Link from 'next/link'
import { Button } from 'component/ui'

interface LinkBtnProps {
  href      : string
  children  : ReactNode
  variant  ?: ButtonVariant
  className?: string
  size     ?: ButtonSize
}

const LinkBtn: FC<LinkBtnProps> = ({ href, children, variant = 'ghost', className, size = 'default' }) => {
  return (
    <Button asChild variant={variant} className={className} size={size}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default LinkBtn
