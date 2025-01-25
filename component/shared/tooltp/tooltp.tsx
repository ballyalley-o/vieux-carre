import { FC, ReactNode } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from 'component/ui'

export interface TooltpProps {
    content  : string
    trigger ?: ReactNode
    children?: ReactNode
}

const Tooltp: FC<TooltpProps> = ({ content, children }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side='right'>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export default Tooltp
