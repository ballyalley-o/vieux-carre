import { ReactNode, FC } from 'react'
import { Button } from 'component/ui'
import { NoScrollBtn } from 'component/shared/btn'

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
      <NoScrollBtn href={href}>{children}</NoScrollBtn>
    </Button>
  )
}

export default LinkBtn
