import { FC, JSX, ReactNode } from 'react'
import { Card, CardContent } from 'component/ui'
import { EditBtn } from 'component/shared/btn'

interface CheckoutCardProps {
  href        : string
  icon        : JSX.Element
  i18Title    : string
  withEditBtn?: boolean
  children    : ReactNode
}
const CheckoutCard: FC<CheckoutCardProps> = ({ href, icon, i18Title, children, withEditBtn = false }) => {
  const renderHeader = () => {
    return (
      <div className={'flex flex-row justify-between items-center pb-4'}>
        <div className="flex flex-row gap-1 items-center">
          {icon && icon}
          <h2 className="text-lg">
            <span>{i18Title}</span>
          </h2>
        </div>
       {withEditBtn && <span> <EditBtn href={href} /></span>}
      </div>
    )
  }
  return (
    <Card>
      <CardContent className={'p-4 gap-4'}>
        {renderHeader()}
        {children}
      </CardContent>
    </Card>
  )
}

export default CheckoutCard
