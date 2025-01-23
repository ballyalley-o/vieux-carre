'use client'

import { FC, useTransition, useState } from 'react'
import { useToast, useAppColors } from 'hook'
import { Minus } from 'lucide-react'
import {
  Button,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from 'component/ui'
import { en } from 'public/locale'
import { delay } from 'lib'

interface DeleteDialg {
  id: string
  action: (orderId: string) => Promise<AppResponse>
}
const DeleteDialg: FC<DeleteDialg> = ({ id, action }) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen]              = useState(false)
  const { toast }                    = useToast()
  const palette                      = useAppColors()

 const handleDeleteOrder = async () => {
    startTransition(async () => {
        await delay(500)
        const response = await action(id)
        if (!response.success) {
            toast({ variant: 'destructive', description: response.message })
        } else {
            setOpen(false)
            toast({ description: response.message })
        }
    })
 }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button size={'sm'} variant={'ghost'}>
          <Minus size={20} color={palette.text.destructive} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{en.message.default.title}</AlertDialogTitle>
          <AlertDialogDescription>{en.message.confirm_delete_order.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>{en.cancel.label}</AlertDialogCancel>
            <AlertDialogAction  disabled={isPending} onClick={handleDeleteOrder} style={{ backgroundColor: palette.action.destructive }}>
                {isPending ? <i>{en.loading.delete_order}</i> : en.delete.label}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialg
