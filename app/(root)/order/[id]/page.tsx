import { FC } from 'react'
import { GLOBAL } from 'vieux-carre'
import { auth } from 'vieux-carre.authenticate'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'
import { getOrderById, KEY, STRIPE, transl } from 'lib'
import OrderViewTable from './order-view-table'

export const metadata: Metadata = { title: transl('order_overview.label') }

interface OrderViewPageProps {
  params: Promise<{ id: string }>
}

const OrderViewPage: FC<OrderViewPageProps> = async ({ params }) => {
  const { id } = await params
  const order  = await getOrderById(id)
  if (!order) notFound()

  const session       = await auth()
  const isAdmin       = session?.user?.role === KEY.ADMIN
  let   client_secret = null

  if (order.paymentMethod === STRIPE && !order.isPaid) {
    const stripe = new Stripe(GLOBAL.STRIPE.STRIPE_SECRET_KEY as string)
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount  : Math.round(Number(order.totalPrice) * 100),
        currency: GLOBAL.PRICES.CURRENCY,
        metadata: { orderId: order.id }
    })
    client_secret = paymentIntent.client_secret
  }

  return (
    <div>
      <OrderViewTable isAdmin={isAdmin} order={order} paypalClientId={GLOBAL.PAYPAL.PAYPAL_CLIENT_ID} stripeClientSecret={client_secret}  />
    </div>
  )
}

export default OrderViewPage
