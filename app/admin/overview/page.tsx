import { Metadata } from 'next'
import { en } from 'public/locale'
import { auth } from 'auth'
import { getOrderSummary, KEY } from 'lib'
import { Card, CardHeader, CardTitle } from 'component/ui'

export const metadata: Metadata = { title: 'Admin Overview' }

const AdminOverviewPage = async () => {
    const session = await auth()
    const isAdmin = session?.user?.role === KEY.ADMIN
    if (!isAdmin) throw new Error(en.error.user_not_authorized)

    const summary = await getOrderSummary()
    console.log(summary)
  return <div className={'space-y-2'}>
    <h2 className="h2-bold">{en.overview.label}</h2>
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className={'flex flex-row items-center justify-between space-y-0 pb-2'}>
                <CardTitle className={'text-sm font-medium'}>
                    {en.total_revenue.label}
                </CardTitle>
            </CardHeader>
        </Card>
    </div>
    {JSON.stringify(summary)}</div>
}

export default AdminOverviewPage
