'use client'
import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'hook'
import { parseAddress, createPayPalOrder, approvePayPalOrder, KEY } from 'lib'
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Badge, Button } from 'component/ui'
import { PriceSummaryCard } from 'component/shared/card'
import OrderViewCard from './order-view-card'

interface OrderViewTableProps {
  order         : Order
  paypalClientId: string
}
const OrderViewTable: FC<OrderViewTableProps> = ({ order, paypalClientId }) => {
  const { orderitems, shippingAddress, paymentMethod, isDelivered, deliveredAt,  isPaid, paidAt } = order
  const { toast } = useToast()
  const PrintPendingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status
    if (isPending) {
      status = <Button variant={'secondary'} disabled={isPending}><i>{'Loading PayPal...'}</i></Button>
    } else if (isRejected) {
      status = <Button variant={'destructive'} disabled>{'PayPal: Error Occured'}</Button>
    }
    return status
  }

  const handleCreatePayPalOrder = async () => {
    const response = await createPayPalOrder(order.id)
    if (!response.success) {
      toast({ variant: 'destructive',  description: response.message })
    }
    return response.data as string
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const response = await approvePayPalOrder(order.id, data)
    toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
  }

  return (
    <Fragment>
        {/* title and order id */}
      <div className="flex flex-row items-center justify-start gap-4">
        <h1 className={'py-4 h3-bold'}>{en.order.label}</h1>
        <span>
          <Badge variant={'secondary'}>{order.id}</Badge>
        </span>
      </div>
      {/* cards  */}
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
            icon={<FontAwesomeIcon icon={paymentMethod === KEY.PAYPAL ? faPaypal : paymentMethod === KEY.STRIPE ? faStripe : faMoneyBill } />}
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
        {/* prices summary */}
        <div>
          <PriceSummaryCard prices={order}>
            {!isPaid && paymentMethod === KEY.PAYPAL && (
              <div className="">
                <PayPalScriptProvider options={{clientId: paypalClientId}}>
                  <PrintPendingState/>
                  <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder}/>
                </PayPalScriptProvider>
              </div>
            )}
          </PriceSummaryCard>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderViewTable
