'use client'
import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { parseAddress, createPayPalOrder, approvePayPalOrder, CASH_ON_DELIVERY, PAYPAL, STRIPE,  toCents } from 'lib'
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useToast } from 'hook'
import { cn } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faPaypal, faCcPaypal, faStripe } from '@fortawesome/free-brands-svg-icons'
import { ArrowLeft } from 'lucide-react'
import { Badge, Button, Separator } from 'component/ui'
import { PriceSummaryCard } from 'component/shared/card'
import { MarkPaidBtn } from 'component/shared/btn'
import OrderViewCard from './order-view-card'
import MarkDeliveredBtn from 'component/shared/btn/mark-delivered-btn'
import StripePayment from './stripe-payment'

interface OrderViewTableProps {
  order              : Omit<Order, 'paymentResult'>
  paypalClientId     : string
  isAdmin            : boolean
  stripeClientSecret : string | null
}
const OrderViewTable: FC<OrderViewTableProps> = ({ order, isAdmin,  paypalClientId, stripeClientSecret }) => {
  const { orderitems, shippingAddress, paymentMethod, isDelivered, deliveredAt,  isPaid, paidAt } = order
  const { toast } = useToast()

  const PrintPendingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status
    if (isPending) {
      status = <Button variant={'secondary'} disabled={isPending}><i>{en.loading.processing}</i></Button>
    } else if (isRejected) {
      status = <Button variant={'destructive'} disabled>{'PayPal: Error Occured'}</Button>
    }
    return status
  }

  const isPayPal         = paymentMethod === PAYPAL
  const isStripe         = paymentMethod === STRIPE
  const isCashOnDelivery = paymentMethod === CASH_ON_DELIVERY

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

  const handleBackButton = () => {
    window.history.back()
  }

  return (
    <Fragment>
        {/* title and order id */}
      <Button variant={'ghost'} onClick={handleBackButton}><ArrowLeft className={'default-size_icon'}/></Button>
      <div className="flex flex-row items-center justify-start gap-4">
          <h1 className={'py-4 h3-bold'}>{en.order.label}</h1>
          <span>
            <Badge variant={'secondary'}>{order.id}</Badge>
          </span>
      </div>
      {/* cards  */}
      <div className="grid md:grid-cols-3 md:gap-5 grid-cols-1 sm:gap-0">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          {/* payment method card */}
          <OrderViewCard
            title={en.payment_method.label}
            subtitle={paymentMethod}
            badgeCondition={isPaid}
            badgeLabel={en.paid_at.label}
            dateAt={paidAt!}
            notBadgeLabel={en.not_paid.label}
            icon={<FontAwesomeIcon icon={isPayPal ? faPaypal : isStripe ? faStripe : faMoneyBill } className={isPayPal ? 'text-blue-700' : isStripe ? 'text-blue-700' : 'text-green-900'}  />}
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
        <div className="mt-4">
          <PriceSummaryCard prices={order} >
          {!isPaid && (
            <Fragment>
             <Separator/>
              <div className={'text-lg font-bold flex items-center'}><FontAwesomeIcon icon={isPayPal ? faCcPaypal : isStripe ? faStripe : faMoneyBill} className={cn('w-10 h-10 mr-2', isPayPal ? 'text-blue-700' : isStripe ? 'text-blue-700' : 'text-green-900')} /><span>{en.checkout.label}</span></div>
            </Fragment>
            )}
            {!isPaid && isPayPal && (
              <div>
                <PayPalScriptProvider options={{clientId: paypalClientId}}>
                  <PrintPendingState/>
                  <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder}/>
                </PayPalScriptProvider>
              </div>
            )}
            {isStripe && !isPaid && stripeClientSecret && <StripePayment priceInCents={toCents(order.totalPrice)} orderId={order.id} clientSecret={stripeClientSecret} />}
            {isAdmin && !isPaid && isCashOnDelivery && <MarkPaidBtn orderId={order.id} />}
            {isAdmin && isPaid  && !isDelivered && <MarkDeliveredBtn orderId={order.id} />}
          </PriceSummaryCard>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderViewTable
