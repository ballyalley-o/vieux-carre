'use client'

import { FC, useTransition } from 'react'
import { useToast } from 'hook'
import { Button } from 'component/ui'
import { updateOrderToDelivered } from 'lib'
import { en } from 'public/locale'


interface MarkDeliveredBtnProps {
  orderId: string
}
const MarkDeliveredBtn: FC<MarkDeliveredBtnProps> = ({ orderId }) => {
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()

  const handleMarkDelivered = async () => {
    startTransition(async () => {
      const response = await updateOrderToDelivered(orderId)
      toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
    })
  }
  return (
    <Button type={'button'} disabled={isPending} onClick={handleMarkDelivered} className={'w-full'}>
      {isPending ? <i>{en.loading.processing}</i> : en.mark_delivered.label}
    </Button>
  )
}

export default MarkDeliveredBtn
