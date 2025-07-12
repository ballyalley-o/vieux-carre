import { JSX } from 'react'
import { Card, CardContent, Badge } from 'component/ui'
import { formatCurrency, transl } from 'lib/util'

interface BagSubtotalCardProps {
  bagItemsPrice : number | string
  subtotal      : React.ReactNode
  checkoutButton: () => JSX.Element
}

const BagSubtotalCard = ({ bagItemsPrice, subtotal, checkoutButton }: BagSubtotalCardProps) => {
  return (
    <Card className={'rounded-sm shadow-none'}>
      <CardContent className={'p-4 gap-4'}>
        <div className={'pb-3 text-xl justify-between flex'}>
          <div>
            {transl('subtotal.label')} &nbsp;
            <Badge variant={'secondary'} className={'text-md'}>
              {subtotal}
            </Badge>
            &nbsp;:&nbsp;
          </div>
          <span className={'font-bold'}> {formatCurrency(bagItemsPrice)}</span>
        </div>
        {checkoutButton()}
      </CardContent>
    </Card>
  )
}

export default BagSubtotalCard