'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { createOrder } from 'lib/action'
import { Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib'

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
        {pending ? transl('place_order.pending') : transl('place_order.label')}
        {pending && <EllipsisLoader />}
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
