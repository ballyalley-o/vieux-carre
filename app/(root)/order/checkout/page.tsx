import { Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { WalletCards, Container, ShoppingBag } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons'
import { Table } from 'component/ui'
import { CheckoutCard, PriceSummaryCard } from 'component/shared/card'
import { PurchaseFlow } from 'component/shared/custom'
import { BagTableBody, BagTableHead } from 'component/shared/bag'
import { getMyBag, getUserById, parseAddress } from 'lib'
import { PATH_DIR } from 'config'
import CheckoutForm from './checkout-form'

export const metadata: Metadata = { title: en.checkout.label }

const CheckoutPage = async () => {
  const bag = await getMyBag()
  const session = await auth()

  const userId = session?.user?.id
  if (!userId) throw new Error(en.error.user_not_found)

  const user = await getUserById(userId)
  if (!bag || bag.items.length === 0) redirect(PATH_DIR.BAG)
  if (!user.address) redirect(PATH_DIR.SHIPPING)
  if (!user.paymentMethod) redirect(PATH_DIR.PAYMENT)

  const userAddress = user.address as ShippingAddress

  const paymentMethodIcon = (method: string) => {
    switch (method) {
      case 'PayPal': return <FontAwesomeIcon icon={faPaypal} className={'text-blue-700 default-size_icon'} />
      case 'Stripe': return <FontAwesomeIcon icon={faStripe} className={'text-purple-600 default-size_icon'} />
      case 'Cash On Delivery': return <FontAwesomeIcon icon={faMoneyBill} className={'text-green-800 default-size_icon'} />
      default: return <FontAwesomeIcon icon={faMoneyBill} className={'text-green-800 default-size_icon'} />
    }
  }

  return (
    <Fragment>
      <PurchaseFlow current={3} locale={en} />
      <h1 className="py-4 h3-bold">{en.checkout.label}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <CheckoutCard
            i18Title={en.shipping_address.label}
            href={PATH_DIR.SHIPPING}
            icon={<Container className={'default-size_icon'} />}
            withEditBtn>
            <p className="font-bold">{userAddress.fullName}</p>
            <p>{parseAddress(userAddress)}</p>
          </CheckoutCard>

          <CheckoutCard i18Title={en.payment_method.label} href={PATH_DIR.PAYMENT} icon={<WalletCards className={'default-size_icon'} />} withEditBtn>
              <div className={'flex items-center'}>{paymentMethodIcon(user.paymentMethod)} <span><p className={'ml-2'}>{user.paymentMethod}</p></span></div>
          </CheckoutCard>

          <CheckoutCard i18Title={en.order_items.label} href={PATH_DIR.PAYMENT} icon={<ShoppingBag className={'default-size_icon'} />}>
            <Table>
              <BagTableHead />
              <BagTableBody bagItems={bag.items} />
            </Table>
          </CheckoutCard>
        </div>
        {/* price summary panel */}
        <PriceSummaryCard prices={bag}>
            <CheckoutForm />
        </PriceSummaryCard>
      </div>
    </Fragment>
  )
}

export default CheckoutPage
