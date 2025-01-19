import { FC } from 'react'
import Link from 'next/link'
import { SquareArrowUpRight } from 'lucide-react'
import { Badge } from 'component/ui'
import Tooltp, { TooltpProps } from './tooltp'

interface TooltpGoBadgeProps extends TooltpProps {
  href    : string
  variant?: BadgeVariant
}
const TooltpGoBadge: FC<TooltpGoBadgeProps> = ({ trigger, content, href, variant = 'secondary' }) => {
  return (
    <Tooltp content={content}>
      <Badge variant={variant} className={'gap-2'}>
        <div>{trigger}</div>
        <span>
          <Link href={href}>
            <SquareArrowUpRight className={'default-size_icon'} />
          </Link>
        </span>
      </Badge>
    </Tooltp>
  )
}

export default TooltpGoBadge
