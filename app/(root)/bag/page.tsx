export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import { getMyBag } from 'lib/action'
import BagTable from './bag-table'
import { transl } from 'lib'

export const metadata: Metadata = { title: transl('shopping_bag.label') }

const BagPage = async () => {
  const bag = await getMyBag()
  return (
    <div>
      <BagTable bag={bag} />
    </div>
  )
}

export default BagPage
