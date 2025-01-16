'use client'
import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { parseAddress } from 'lib'
import { Badge } from 'component/ui'
import OrderViewCard from './order-view-card'

interface OrderViewTableProps {
  order: Order
}
const OrderViewTable: FC<OrderViewTableProps> = ({ order }) => {
  const { id, orderitems, shippingAddress, shippingPrice, taxPrice, itemsPrice, totalPrice, paymentMethod, isDelivered, deliveredAt,  isPaid, paidAt } = order

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-start gap-4">
        <h1 className={'py-4 h3-bold'}>{en.order.label}</h1>
        <span>
          <Badge variant={'secondary'}>{order.id}</Badge>
        </span>
      </div>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          {/* payment method card */}
          <OrderViewCard
            title={en.payment_method.label}
            subtitle={paymentMethod}
            badgeCondition={isPaid}
            badgeLabel={en.paid_at.label}
            dateAt={paidAt!}
            notBadgeLabel={en.not_paid.label}
          />

          {/* payment method card */}
          <OrderViewCard
            title={en.shipping_address.label}
            subtitle={shippingAddress.fullName}
            subtitle2={parseAddress(shippingAddress)}
            badgeCondition={isDelivered}
            badgeLabel={en.delivered_at.label}
            dateAt={deliveredAt!}
            notBadgeLabel={en.not_delivered.label}
          />

          {/* order items card */}
          <OrderViewCard title={en.order_items.label} orderItems={orderitems} showTable />
        </div>
      </div>
    </Fragment>
  )
}

export default OrderViewTable
