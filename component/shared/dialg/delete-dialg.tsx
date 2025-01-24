'use client'

import { FC, Fragment, useTransition, useState } from 'react'
import { useToast, useAppColors } from 'hook'
import { en } from 'public/locale'
import { Minus } from 'lucide-react'
import {
  Button,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter
} from 'component/ui'
import { delay } from 'lib'
import { EllipsisLoader } from 'component/shared/loader'

interface DeleteDialg {
  id: string
  action: (orderId: string) => Promise<AppResponse>
  children?: React.ReactNode
}
const DeleteDialg: FC<DeleteDialg> = ({ id, action, children }) => {
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
      <AlertDialogTrigger asChild>
      {children ? children : (
        <Button size={'sm'} variant={'ghost'}>
         <Minus size={20} color={palette.text.destructive} />
        </Button>
      )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{en.message.default.title}</AlertDialogTitle>
          <AlertDialogDescription>{en.message.confirm_delete_order.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{en.cancel.label}</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDeleteOrder} style={{ backgroundColor: palette.action.destructive }}>
            {isPending ? (
              <Fragment>
                <i>{en.loading.delete_order}</i> <EllipsisLoader />
              </Fragment>
            ) : (
              en.delete.label
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialg
