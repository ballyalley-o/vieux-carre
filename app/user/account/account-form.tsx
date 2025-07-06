'use client'

import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useToast } from 'hook'
import { Check } from 'lucide-react'
import { transl, updateUserAccount, UpdateUserSchema } from 'lib'
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
  const { control, formState: { isDirty, isSubmitting } } = form
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-5'}>
          <div className="flex flex-col gap-5">
                <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
                <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
                <RHFGoogleAddressAutocomplete control={control} name={FORM_KEY.address} label={transl('form.address.label')} />
              <div className={'relative'}>
                <LoadingBtn isPending={isSubmitting} label={transl('update_account.label')} className={'w-full'} icon={isDirty ? <Check size={15}/> : <></> } disabled={!isDirty || isSubmitting} />
              </div>
          </div>
      </form>
    </FormProvider>
  )
}

export default AccountForm
