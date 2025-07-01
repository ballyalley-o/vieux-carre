export const dynamic = 'force-dynamic'
import { Fragment } from 'react'
import { PATH_DIR } from 'vc.dir'
import { en } from 'public/locale'
import { Metadata } from 'next'
import { auth } from 'vieux-carre.authenticate'
import { getMyBag, getUserById } from 'lib/action'
import { redirect } from 'next/navigation'
import { PurchaseFlow } from 'component/shared/custom'
import { transl } from 'lib'
import ShippingAddressForm from './shipping-address-form'

export const metadata: Metadata = {
  title: 'Shipping Address'
}

const ShippingPage = async () => {
    const bag = await getMyBag()
    if (!bag || bag.items.length === 0) redirect(PATH_DIR.BAG)
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) throw new Error(transl('error.user_not_found'))
    const user = await getUserById(userId)
  return (
    <Fragment>
      <PurchaseFlow current={1} locale={en} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </Fragment>
  )
}

export default ShippingPage
