import { FC } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { auth } from 'auth'
import { getOrderById, KEY } from 'lib'
import { GLOBAL } from 'config/global'
import OrderViewTable from './order-view-table'

interface OrderViewPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Order Overview'
}
const OrderViewPage: FC<OrderViewPageProps> = async ({ params }) => {
  const { id } = await params
  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()
  const isAdmin = session?.user?.role === KEY.ADMIN
  return (
    <div>
      <OrderViewTable isAdmin={isAdmin} order={order} paypalClientId={GLOBAL.PAYPAL.PAYPAL_CLIENT_ID} />
    </div>
  )
}

export default OrderViewPage
