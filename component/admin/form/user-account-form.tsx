'use client'

import { FC } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { Check } from 'lucide-react'
import { delay, formatDateTime, updateUser, UpdateUserAccountSchema } from 'lib'
import { Form, Badge } from 'component/ui'
import { RHFFormField, RHFFormSelect } from 'component/shared/rhf'
import { LoadingBtn } from 'component/shared/btn'

enum FORM_KEY {
    name  = 'name',
    email = 'email',
    role  = 'role'
}

interface UpdateAccountFormProps {
    user: UpdateUserAccount
}

const UserAccountForm: FC<UpdateAccountFormProps> = ({ user }) => {
  const { toast } = useToast()
  const form      = useForm<UpdateUserAccount>({
    resolver     : zodResolver(UpdateUserAccountSchema),
    defaultValues: user
  })
  const { control, handleSubmit, formState } = form

  const onSubmit = async (values: UpdateUserAccount) => {
      await delay(500)
    try {
      const response = await updateUser({...values, id:user.id })
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      }
      toast({ description: response.message})
    } catch (error) {
      toast({ variant: 'destructive', description: (error as AppError).message })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                  <RHFFormField control={control} name={FORM_KEY.email} type={'input'} formKey={FORM_KEY.email} disabled />
                  <RHFFormField control={control} name={FORM_KEY.name} type={'input'} formKey={FORM_KEY.name} />
                  <RHFFormSelect control={control} name={FORM_KEY.role} formKey={FORM_KEY.role} options={GLOBAL.USER_ROLES} defaultOption={user.role} disabled={formState.isSubmitting} />
                <div className={'relative'}>
                  <LoadingBtn isPending={formState.isSubmitting} label={en.update_account.label} className={'w-full'} icon={<Check size={15}/>} />
                <div className="flex justify-end align-center items-center gap-2 mt-5">
                  <p className={'text-muted-foreground'}>{en.last_updated_at.label}</p><span><Badge variant={'secondary'} className={'w-auto'}>{user?.updatedAt && formatDateTime(user?.updatedAt).dateTime}</Badge></span>
                </div>
                </div>
            </div>
        </form>
      </Form>
    </div>
  )
}

export default UserAccountForm
