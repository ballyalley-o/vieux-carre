import { Metadata } from 'next'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import { auth } from 'auth'
import Link from 'next/link'
import { formatCurrency, formatDateTime, formatNumber, getOrderSummary, KEY } from 'lib'
import { Landmark, Receipt, Users, Package, SquareArrowOutUpRight } from 'lucide-react'
import { Table } from 'component/ui'
import { AdminOverviewCard, GridCard, TblHead, TblBody } from 'component/shared'
import { PATH_DIR } from 'config'
import Chart from './chart'

export const metadata: Metadata = { title: 'Admin Overview' }

type FourCellType = TblCells<4>
const AdminOverviewPage = async () => {
  const session = await auth()
  const isAdmin = session?.user?.role === KEY.ADMIN
  if (!isAdmin) throw new Error(en.error.user_not_authorized)

  const summary = await getOrderSummary()
  const chartData = { salesData: summary.salesData }

  const HEADER: FourCellType = {
    cells: [
      { id: 'customer', value: en.customer.label, align: 'left' },
      { id: 'date', value: en.date.label, align: 'left' },
      { id: 'total-price', value: en.total.label, align: 'left' },
      { id: 'action', value: en.action.label, align: 'left' }
    ]
  }

  const BODY = (item: Order): FourCellType => ({
    cells: [
        { id: 'customer', value: item?.user?.name ? item.user.name : en.archived_user.label, align: 'left' },
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
      <h2 className="h2-bold">{en.dashboard.label}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <AdminOverviewCard label={en.total_revenue.label} icon={<Landmark size={20} className={'text-muted-foreground'} />}>
          <div className="text-xs align-super">{GLOBAL.PRICES.CURRENCY}&nbsp;</div>
          <span className="text-2xl font-bold">{formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)}</span>
        </AdminOverviewCard>
        <AdminOverviewCard label={en.sales.label} icon={<Receipt size={20} className={'text-muted-foreground'} />}>
          <div className="text-2xl font-bold">{formatNumber(summary.count.orders)}</div>
        </AdminOverviewCard>
        <AdminOverviewCard label={en.customer.customers.label} icon={<Users size={20} className={'text-muted-foreground'} />}>
          <div className="text-2xl font-bold">{formatNumber(summary.count.users)}</div>
        </AdminOverviewCard>
        <AdminOverviewCard label={en.product.products.label} icon={<Package size={20} className={'text-muted-foreground'} />}>
          <div className="text-2xl font-bold">{formatNumber(summary.count.products)}</div>
        </AdminOverviewCard>
      </div>
      <div className={'grid gap-4 md:grid-cols-2 lg:grid-cols-7'}>
        <GridCard label={en.overview.label} span={4}>
            <Chart data={chartData} />
        </GridCard>
        <GridCard label={en.recent_sales.label} span={3}>
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
