'use client'

import { FC, Fragment, useTransition } from 'react'
import { en } from 'public/locale'
import { useToast } from 'hook'
import { updateCODOrderToPaid } from 'lib'
import { Button } from 'component/ui'
import { EllipsisLoader } from '../loader'


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
      {isPending ? ( <Fragment> <i>{en.loading.processing}</i> <EllipsisLoader /></Fragment> ) : en.mark_paid.label}
    </Button>
  )
}

export default MarkPaidBtn
