export const dynamic = 'force-dynamic'
import { Fragment } from 'react'
import { auth } from 'vieux-carre.authenticate'
import { PATH_DIR } from 'vc.dir'
import { en } from 'vc.locale'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getMyBag, getUserById } from 'lib/action'
import { PurchaseFlow } from 'component/shared/custom'
import { transl } from 'lib'
import ShippingAddressForm from './shipping-address-form'

export const metadata: Metadata = { title: transl('shipping.label') }

const ShippingPage = async () => {
    const bag = await getMyBag()
    if (!bag || bag.items.length === 0) redirect(PATH_DIR.BAG)
    const session = await auth()
    const userId  = session?.user?.id
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
