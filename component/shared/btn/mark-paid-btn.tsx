'use client'

import { FC, useTransition } from 'react'
import { useToast } from 'hook'
import { Button } from 'component/ui'
import { updateCODOrderToPaid } from 'lib'
import { en } from 'public/locale'


interface MarkPaidBtnProps {
    orderId: string
}
const MarkPaidBtn: FC<MarkPaidBtnProps> = ({ orderId }) => {
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()

  const handleMarkPaid = async () => {
    startTransition(async () => {
      const response = await updateCODOrderToPaid(orderId)
      toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
    })
  }
  return (
    <Button type={'button'} disabled={isPending} onClick={handleMarkPaid} className={'w-full'}>
      {isPending ? <i>{en.loading.processing}</i> : en.mark_paid.label}
    </Button>
  )
}

export default MarkPaidBtn
