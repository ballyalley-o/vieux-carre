import { Fragment } from 'react'
import { en } from 'public/locale'
import { PurchaseFlow } from 'component/shared/custom'
import CheckoutForm from './checkout-form'

const CheckoutPage = () => {
  return (
    <Fragment>
      <PurchaseFlow current={3} locale={en} />
      <CheckoutForm />
    </Fragment>
  )
}

export default CheckoutPage
