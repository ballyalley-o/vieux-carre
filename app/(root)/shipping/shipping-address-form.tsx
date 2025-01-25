'use client'

import { FC, Fragment, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { en } from 'public/locale'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useToast } from 'hook'
import { shippingAddressDefaultValue, updateUserAddress } from 'lib'
import { ShippingAddressSchema } from 'lib/schema'
import { Form } from 'component/ui/form'
import { RHFFormField } from 'component/shared/rhf'
import { LoadingBtn } from 'component/shared/btn'
import { PATH_DIR } from 'config'

interface ShippingAddressFormProps {
  address: ShippingAddress
}

const ShippingAddressForm: FC<ShippingAddressFormProps> = ({ address }) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ShippingAddressSchema>>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValue
  })
  const router = useRouter()
  const { toast } = useToast()
  const { control, handleSubmit } = form

  const onSubmit: SubmitHandler<z.infer<typeof ShippingAddressSchema>> = async (data) => {
    startTransition(async () => {
      const response = await updateUserAddress(data)
      if (!response.success) {
        toast({variant: 'destructive', description: response.message})
        return
      }
      router.push(PATH_DIR.PAYMENT)
    })
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">{en.shipping_address.label}</h1>
        <p className="text-sm text-muted-foreground">{en.shipping_address.description}</p>
        <Form {...form}>
          <form method={'post'} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <RHFFormField control={control} name={'fullName'} formKey={'full_name'} />
            <RHFFormField control={control} name={'streetAddress'} formKey={'street'} />
            <RHFFormField control={control} name={'city'} formKey={'city'} />
            <RHFFormField control={control} name={'postalCode'} formKey={'postal_code'} />
            <RHFFormField control={control} name={'country'} formKey={'country'} />
            <LoadingBtn isPending={isPending} label={en.continue.label} className={'w-full'} />
          </form>
        </Form>
      </div>
    </Fragment>
  )
}

export default ShippingAddressForm
