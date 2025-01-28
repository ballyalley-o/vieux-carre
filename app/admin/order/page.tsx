import { Metadata } from 'next'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import { auth } from 'auth'
import { getAllOrders, deleteOrder, formatCurrency, formatDateTime, formatId, generateTitle, limiter, KEY } from 'lib'
import { Table, Badge } from 'component/ui'
import { Pagination, DeleteDialg, Tooltp, NoResult } from 'component/shared'
import { TblHead, TblBody } from 'component/shared/tbl'
import { TooltpGoBadge } from 'component/shared/tooltp'
import { Pagination, DeleteDialg, Tooltp } from 'component/shared'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: generateTitle(en.order.orders, 'Admin') }

interface AdminOrdersPageProps {
  searchParams: Promise<AppPage<number>>
}

const AdminOrdersPage = async ({ searchParams }: AdminOrdersPageProps) => {
  const { page = '1' } = await searchParams
  const session        = await auth()
  if (session?.user?.role !== KEY.ADMIN) throw new Error(en.error.user_not_authorized)

  const orders = await getAllOrders({ page: Number(page), limit: GLOBAL.LIMIT.ADMIN_ORDERS })

  type SevenCellType = TblCells<7>
  const HEADER: SevenCellType = {
    cells: [
      { id: 'id', value: 'Order id', align: 'left' },
      { id: 'date', value: 'Date', align: 'center' },
      { id: 'customer', value: 'Customer', align: 'left' },
      { id: 'total', value: 'Total', align: 'left' },
      { id: 'paid', value: 'Paid', align: 'center' },
      { id: 'delivered', value: 'Delivered', align: 'center' },
      { id: 'action', value: '', align: 'center' }
    ]
  }

  const BODY = (item: Order): SevenCellType => ({
    cells: [
      {
        id: 'id',
        value: (
          <div className={'flex flex-row items-center'}>
            <TooltpGoBadge trigger={formatId(item.id)} href={PATH_DIR.ORDER_VIEW(item.id)} content={`${en.go_to.label} this order`} />
          </div>
        ),
        align: 'left'
      },
      { id: 'date', value: formatDateTime(item.createdAt).dateTime, align: 'center' },
      { id: 'customer', value: limiter(item.user.name), align: 'left' },
      { id: 'total', value: formatCurrency(item.totalPrice), align: 'left' },
      {
        id: 'paid',
        value: <Badge variant={item.isPaid ? 'secondary' : 'destructive'}>{item.isPaid ? formatDateTime(item.paidAt!).dateTime : 'Not paid'}</Badge>,
        align: 'center'
      },
      {
        id: 'delivered',
        value: (
          <Badge variant={item.isDelivered ? 'secondary' : 'destructive'}>
            {item.isDelivered ? formatDateTime(item.deliveredAt!).dateTime : 'Not delivered'}
          </Badge>
        ),
        align: 'center'
      },
      {
        id: 'action',
        value:  <Tooltp content={en.delete.label}><DeleteDialg id={item.id} action={deleteOrder} /></Tooltp> ,
        align: 'center'
      }
    ]
  })

  return (
    <div className={'space-y-2'}>
      <h2 className="h2-bold">{en.order.orders}</h2>
      <div className="overflow-x-auto">
        <Table>
          <TblHead cells={HEADER.cells} />
          <TblBody cells={BODY} items={orders.data as unknown as Order[]} />
        </Table>
        {orders.totalPages > 1 && (
          <div className={'mt-5 flex justify-end'}>
            <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrdersPage
