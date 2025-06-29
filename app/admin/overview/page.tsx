import { Metadata } from 'next'
import { GLOBAL } from 'vieux-carre'
import { PATH_DIR } from 'vc.dir'
import { auth } from 'vieux-carre.authenticate'
import Link from 'next/link'
import { formatCurrency, formatDateTime, formatNumber, getOrderSummary, generateTitle, KEY, transl } from 'lib'
import { Landmark, Receipt, Users, Package, SquareArrowOutUpRight } from 'lucide-react'
import { Table } from 'component/ui'
import { AdminOverviewCard, GridCard, TblHead, TblBody } from 'component/shared'
import Chart from './chart'

export const metadata: Metadata = { title: generateTitle(transl('overview.label'), transl('admin.label')) }

type FourCellType = TblCells<4>
const AdminOverviewPage = async () => {
  const session = await auth()
  const isAdmin = session?.user?.role === KEY.ADMIN
  if (!isAdmin) throw new Error(transl('error.user_not_authorized'))

  const summary = await getOrderSummary()
  const chartData = { salesData: summary.salesData }

  const HEADER: FourCellType = {
    cells: [
      { id: 'customer', value: transl('customer.label'), align: 'left' },
      { id: 'date', value: transl('date.label'), align: 'left' },
      { id: 'total-price', value: transl('total.label'), align: 'left' },
      { id: 'action', value: transl('action.label'), align: 'left' }
    ]
  }

  const BODY = (item: Order): FourCellType => ({
    cells: [
        { id: 'customer', value: item?.user?.name ? item.user.name : transl('archived_user.label'), align: 'left' },
        { id: 'date', value: formatDateTime(item.createdAt).date, align: 'left' },
        { id: 'total-price', value: formatCurrency(item.totalPrice), align: 'left' },
        { id: 'action',
            value: (
                    <Link href = {PATH_DIR.ORDER_VIEW(item.id)}>
                        <span className = {'px-2'}><SquareArrowOutUpRight size = {15} className = {'text-muted-foreground'} /></span>
                    </Link>
             ),
        align: 'left' },
    ]
  })

  return (
    <div className={'space-y-4'}>
      <h2 className="h2-bold">{transl('dashboard.label')}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <AdminOverviewCard label={transl('total_revenue.label')} icon={<Landmark size={20} className={'text-muted-foreground'} />}>
          <div className="text-xs align-super">{GLOBAL.PRICES.CURRENCY}&nbsp;</div>
          <span className="text-2xl font-bold">{formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)}</span>
        </AdminOverviewCard>
        <AdminOverviewCard label={transl('sales.label')} icon={<Receipt size={20} className={'text-muted-foreground'} />}>
          <div className="text-2xl font-bold">{formatNumber(summary.count.orders)}</div>
        </AdminOverviewCard>
        <AdminOverviewCard label={transl('customer.customers.label')} icon={<Users size={20} className={'text-muted-foreground'} />}>
          <div className="text-2xl font-bold">{formatNumber(summary.count.users)}</div>
        </AdminOverviewCard>
        <AdminOverviewCard label={transl('product.products.label')} icon={<Package size={20} className={'text-muted-foreground'} />}>
          <div className="text-2xl font-bold">{formatNumber(summary.count.products)}</div>
        </AdminOverviewCard>
      </div>
      <div className={'grid gap-4 md:grid-cols-2 lg:grid-cols-2'}>
        <GridCard label={transl('overview.label')} span={4}>
            <Chart data={chartData} />
        </GridCard>
        <GridCard label={transl('recent_sales.label')} span={4} className={'border-t-2 border-b-0 border-x-0'}>
            <Table>
                <TblHead cells={HEADER.cells} />
                <TblBody cells={BODY} items={summary.latestSales as unknown as Order[]} />
            </Table>
        </GridCard>
      </div>
    </div>
  )
}

export default AdminOverviewPage
