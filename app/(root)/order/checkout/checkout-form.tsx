'use client'
import { FormEvent } from 'react'
import { en } from 'public/locale'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { createOrder } from 'lib/action'
import { Barcode } from 'lucide-react'
import { Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'

const CheckoutForm = () => {
  const router = useRouter()
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { redirectTo } = await createOrder()

    if (redirectTo) router.push(redirectTo)
  }
  const CheckoutButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className={'w-full'}>
        {pending ? <EllipsisLoader /> : <Barcode className={'default-size_icon'} />}
        {pending ? <i>{en.place_order.pending}</i> : en.place_order.label}
      </Button>
    )
  }
  return (
    <form onSubmit={handleSubmit} className={'w-full'}>
      <CheckoutButton />
    </form>
  )
}

export default CheckoutForm
