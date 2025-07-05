'use client'

import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { Check } from 'lucide-react'
import { formatDateTime, transl, updateUserAccount, UpdateUserSchema } from 'lib'
import { Form, Badge } from 'component/ui'
import { RHFFormField, RHFGoogleAddressAutocomplete } from 'component/shared/rhf'
import { LoadingBtn } from 'component/shared/btn'

enum FORM_KEY {
    name    = 'name',
    email   = 'email',
    address = 'address'
}

const AccountForm = ({ user }: { user: { address?: ShippingAddress ,updatedAt: Date }  }) => {
  const { data: session, update } = useSession()
  const form                      = useForm<UpdateUser>({
    resolver     : zodResolver(UpdateUserSchema),
    defaultValues: { name: session?.user?.name ?? '', email: session?.user?.email ?? '', address: user?.address }
  })

  const { toast }   = useToast()
  const { control } = form
  const onSubmit    = async (values: UpdateUser) => {
    const response = await updateUserAccount(values)
    if (!response.success) {
        return toast({ variant: 'destructive', description: response.message })
    }
    const newSession = {...session, user: { ...session?.user, name: values.name, address: values.address }}
    await update(newSession)
    toast({ description: transl('update_account.toast') })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-5'}>
          <div className="flex flex-col gap-5">
                <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
                <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
                <RHFGoogleAddressAutocomplete control={control} name={FORM_KEY.address} label={transl('form.address.label')} />
              <div className={'relative'}>
                <LoadingBtn isPending={form.formState.isSubmitting} label={transl('update_account.label')} className={'w-full'} icon={<Check size={15}/>} />
              <div className="flex justify-end align-center items-center gap-2 mt-5">
                <p className={'text-muted-foreground'}>{transl('last_updated_at.label')}</p><span><Badge variant={'secondary'} className={'w-auto'}>{formatDateTime(user?.updatedAt).dateTime}</Badge></span>
              </div>
              </div>
          </div>
      </form>
    </Form>
  )
}

export default AccountForm
