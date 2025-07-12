'use client'

import { FC, Fragment, useTransition, useState } from 'react'
import { GLOBAL } from 'vieux-carre'
import { PATH_DIR } from 'vc.dir'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { CASH_ON_DELIVERY, PAYMENT_METHODS, PaymentMethodSchema, PAYPAL, STRIPE, transl, updateUserPaymentMethod } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal, faStripeS } from '@fortawesome/free-brands-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'

interface PaymentMethodFormProps {
  paymentMethod: string | null
}

const PaymentForm: FC<PaymentMethodFormProps> = ({ paymentMethod }) => {
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null)
  const [isPending, startTransition]      = useTransition()
  const router                            = useRouter()
  const { toast }                         = useToast()
  const form                              = useForm<z.infer<typeof PaymentMethodSchema>>({
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: { type: paymentMethod || GLOBAL.PAYMENT_METHOD_DEFAULT }
  })

  const { handleSubmit } = form


  const handleButtonClick = (method: string) => {
    setLoadingMethod(method)
    form.setValue('type', method)
  }

  const onSubmit = async (data: z.infer<typeof PaymentMethodSchema>) => {
    startTransition(async () => {
      const response = await updateUserPaymentMethod(data)
      if (!response.success) {
        toast({ variant: "destructive", description: response.message })
        return
      }
      router.push(PATH_DIR.CHECKOUT)
    })
  }

  const renderPaymentMethodIcon = (method: string) => {
    switch (method) {
      case PAYPAL:
        return <FontAwesomeIcon icon={faPaypal} className={'text-blue-600'} />
      case STRIPE:
        return <FontAwesomeIcon icon={faStripeS} className={'text-purple-700'} />
      case CASH_ON_DELIVERY:
        return <FontAwesomeIcon icon={faMoneyBill} className={'text-green-700'} />
      default:
        return <FontAwesomeIcon icon={faMoneyBill} className={'text-green-700'} />
    }
  }

  return (
    <Fragment>
      <div className={"max-w-md mx-auto space-y-4 items-center"}>
        <h1 className={"h2-bold my-2"}>{transl('payment_method.label')}</h1>
        <p className={"text-sm text-muted-foreground"}>{transl('payment_method.description')}</p>
        <Form {...form}>
          <form method={'post'} onSubmit={handleSubmit(onSubmit)} className={"space-y-4"}>
            {PAYMENT_METHODS.map((_method, index) => (
              <LoadingBtn key={index} isPending={loadingMethod === _method && isPending} type={'submit'} variant={'outline'} label={_method} className={`w-full`} dotColor={'text-black'}  onClick={() => handleButtonClick(_method)} icon={renderPaymentMethodIcon(_method)} />
            ))}
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default PaymentForm
