'use client'

import { FC, Fragment, useTransition } from 'react'
import { useToast } from 'hook'
import { Button } from 'component/ui'
import { updateOrderToDelivered } from 'lib'
import { en } from 'public/locale'
import { EllipsisLoader } from '../loader'


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
      {isPending ? ( <Fragment> <i>{en.loading.processing}</i> <EllipsisLoader /></Fragment> ) : en.mark_delivered.label}
    </Button>
  )
}

export default MarkDeliveredBtn
