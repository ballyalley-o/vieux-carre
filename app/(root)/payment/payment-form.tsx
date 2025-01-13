'use client'

import { FC, Fragment, useTransition } from 'react'
import { en } from 'public/locale'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { PAYMENT_METHODS, PaymentMethodSchema, updateUserPaymentMethod } from 'lib'
import { Form, FormField, FormItem, FormControl, FormLabel, RadioGroup, RadioGroupItem, FormMessage } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'
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
            <div className="flex flex-col md:flex-row min-h-[100px] items-center">
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-6">
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-2">
                        {PAYMENT_METHODS.map((method) => (
                          <FormItem key={method} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={method} checked={field.value === method} />
                            </FormControl>
                            <FormLabel className={'font-normal'}>{method}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <LoadingBtn isPending={isPending} label={en.continue.label} />
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default PaymentForm
