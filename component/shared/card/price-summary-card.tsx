import { FC, ReactNode } from 'react'
import { en } from 'public/locale'
import { Card, CardContent } from 'component/ui'
import PriceSummaryRowProps from './price-summary-row'

interface Prices {
    itemsPrice   : string
    taxPrice     : string
    shippingPrice: string
    totalPrice   : string
}

interface PriceSummaryCardProps {
  prices   : Prices
  children?: ReactNode
}
const PriceSummaryCard: FC<PriceSummaryCardProps> = ({ prices, children }) => {
  const PRICE_SUMMARY_CARD = [
    { label: en.item.items.label, price: prices.itemsPrice, className: '' },
    { label: en.tax.label, price: prices.taxPrice, className: '' },
    { label: en.shipping.label, price: prices.shippingPrice, className: '' },
    { label: en.total.label, price: prices.totalPrice, className: 'font-bold' },
  ]

  return (
      <Card className="border-none">
        <CardContent className={'p-4 gap-4 space-y-4'}>
          {PRICE_SUMMARY_CARD.map(({ label, price, className }, index) => (
            <PriceSummaryRowProps key={index} price={price} label={label} className={className} />
          ))}
          {children}
        </CardContent>
      </Card>
  )
}

export default PriceSummaryCard;