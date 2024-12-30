import { ReactNode, FC } from 'react'
import Link from 'next/link'
import { Button } from 'component/ui'

type ButtonVariant = 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link' | null | undefined

interface LinkButtonProps {
  href: string
  children: ReactNode
  variant?: ButtonVariant
}

const LinkButton: FC<LinkButtonProps> = ({ href, children, variant = 'ghost' }) => {
  return (
    <Button asChild variant={variant}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default LinkButton
