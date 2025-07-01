import { Fragment } from 'react'
import { auth } from 'vieux-carre.authenticate'
import { en } from 'public/locale'
import { getUserById, transl } from 'lib'
import { PurchaseFlow } from 'component/shared/custom'
import PaymentForm from './payment-form'

export async function generateMetadata() {
  return {
    title: transl('payment.label')
  }
}

const PaymentPage = async () => {
  const session = await auth()
  const userId  = session?.user?.id
  if (!userId) throw new Error(transl('error.user_not_found'))
  const user = await getUserById(userId)
  return (
    <Fragment>
      <PurchaseFlow current={2} locale={en} />
      <PaymentForm paymentMethod={user.paymentMethod} />
    </Fragment>
  )
}

export default PaymentPage
