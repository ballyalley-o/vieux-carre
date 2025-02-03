import { FC, FormEvent, useState } from 'react'
import { GLOBAL } from 'vieux-carre'
import { en } from 'public/locale'
import { useTheme } from 'next-themes'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { formatCurrency, themeToggle } from 'lib'
import { Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { PATH_DIR } from 'config'

interface StripePaymentProps {
  priceInCents: number
  orderId     : string
  clientSecret: string
}

const StripePayment: FC<StripePaymentProps> = ({ priceInCents, orderId, clientSecret }) => {
  const stripePromise          = loadStripe(GLOBAL.STRIPE.STRIPE_PUBLISHABLE_KEY)
  const { theme, systemTheme } = useTheme()
  const THEME                  = themeToggle(theme, systemTheme)

  const StripeForm = () => {
    const [loading, setLoading]           = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail]               = useState('')
    const stripe                          = useStripe()
    const elements                        = useElements()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (stripe == null || elements == null || email == null) return
        setLoading(true)
        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: PATH_DIR.STRIPE_CALLBACK(orderId),
            }
        }).then(({ error }) => {
            if (error?.type === 'card_error' || error?.type === 'validation_error') {
                setErrorMessage(error?.message ?? en.error.unknown_error)
            } else {
                setErrorMessage(en.error.unknown_error)
            }
        }).finally(() => setLoading(false))
    }

    return (
      <form className={'space-y-4'} onSubmit={handleSubmit}>
        {errorMessage && <div className={'text-destructive'}>{errorMessage}</div>}
        <PaymentElement />
        <div>
            <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)}/>
        </div>
        <Button className={'w-full'} size={'sm'} disabled={stripe === null || elements === null || loading}>
          {loading ?<div className={'flex items-center'}>{en.loading.processing} <span><EllipsisLoader/></span></div> : `${en.purchase.label} ${formatCurrency(priceInCents / 100)}`}
        </Button>
      </form>
    )
  }

  return (
    <Elements options={{ clientSecret, appearance: { theme: THEME } }} stripe={stripePromise}>
      <StripeForm />
    </Elements>
  )
}

export default StripePayment
