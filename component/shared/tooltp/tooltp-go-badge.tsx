import { FC } from 'react'
import Link from 'next/link'
import { SquareArrowUpRight } from 'lucide-react'
import { Badge } from 'component/ui'
import Tooltp, { TooltpProps } from './tooltp'

interface TooltpGoBadgeProps extends TooltpProps {
  href    : string
  variant?: BadgeVariant
}

/**
 * TooltpGoBadge component renders a badge with a tooltip and a link.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.trigger - The content to trigger the tooltip.
 * @param {string} props.content - The content to be displayed inside the tooltip.
 * @param {string} props.href - The URL to be linked to when the badge is clicked.
 * @param {string} [props.variant='secondary'] - The variant of the badge, defaults to 'secondary'.
 *
 * @returns {JSX.Element} The rendered TooltpGoBadge component.
 */
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
