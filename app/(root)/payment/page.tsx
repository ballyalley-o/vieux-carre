import { Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { auth } from 'vieux-carre.authenticate'
import { getUserById } from 'lib'
import { PurchaseFlow } from 'component/shared/custom'
import PaymentForm from './payment-form'

export const metadata: Metadata = { title: 'Payment' }

const PaymentPage = async () => {
  const session = await auth()
  const userId  = session?.user?.id
  if (!userId) throw new Error(en.error.user_not_found)
  const user = await getUserById(userId)
  return (
    <Fragment>
      <PurchaseFlow current={2} locale={en} />
      <PaymentForm paymentMethod={user.paymentMethod} />
    </Fragment>
  )
}

export default PaymentPage
