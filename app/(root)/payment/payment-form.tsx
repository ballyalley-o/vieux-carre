'use client'

import { FC, Fragment, useTransition } from 'react'
import { en } from 'public/locale'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { PAYMENT_METHODS, PaymentMethodSchema, updateUserPaymentMethod } from 'lib'
import { Form } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'
import { RHFRadioGroup } from 'component/shared/rhf'
import { GLOBAL, PATH_DIR } from 'config'

interface PaymentMethodFormProps {
  paymentMethod: string | null
}

const PaymentForm: FC<PaymentMethodFormProps> = ({ paymentMethod }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof PaymentMethodSchema>>({
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: { type: paymentMethod || GLOBAL.PAYMENT_METHOD_DEFAULT }
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: z.infer<typeof PaymentMethodSchema>) => {
    startTransition(async () => {
      const response = await updateUserPaymentMethod(data)
      if (!response.success) {
        toast({ variant: "destructive", description: response.message })
        return
      }
      router.push(PATH_DIR.PLACE_ORDER)
    })
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto space-y-4 items-center">
        <h1 className="h2-bold my-2">{en.payment_method.label}</h1>
        <p className="text-sm text-muted-foreground">{en.payment_method.description}</p>
        <Form {...form}>
          <form method={'post'} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <RHFRadioGroup control={control} name={'type'} group={PAYMENT_METHODS} />
            <LoadingBtn isPending={isPending} label={en.continue.label} />
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default PaymentForm
