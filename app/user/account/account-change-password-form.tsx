'use client'

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from 'hook'
import { updateUserPassword } from 'lib/action/user.action'
import { Button } from 'component/ui/button'
import { RHFPasswordField } from 'component/shared/rhf'
import { EllipsisLoader } from 'component/shared/loader'
import { delay, userUpdatePasswordDefaultValue, UpdateUserPasswordSchema, transl, cn } from 'lib'

const AccountChangePasswordForm = () => {
  const { toast } = useToast()
  const form      = useForm<UpdateUserPassword>({ resolver: zodResolver(UpdateUserPasswordSchema), defaultValues: userUpdatePasswordDefaultValue })

  const { register, control, formState: { isSubmitting, isDirty }, handleSubmit } = form

  const ChangePasswordButton = () => {
    return (
      <div className={'mb-5'}>
        <Button disabled={isSubmitting || !isDirty} className="w-full" variant={'default'}>
          {isSubmitting ? <EllipsisLoader /> : transl('change_password.label')}
        </Button>
      </div>
    )
  }

  const onSubmit: SubmitHandler<UpdateUserPassword> = async (data) => {
    try {
      const response = await updateUserPassword(data)
      if (response.success === true) {
        await delay(500)
        toast({ description: response.message })
        form.reset()
      } else {
        toast({ variant: 'destructive', description: response.message })
      }
    } catch (error) {
      toast({ variant: 'destructive', description: (error as AppError).message })
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('space-y-6')}>
          <RHFPasswordField control={control} register={register} name={'oldPassword'} formKey={'old_password'} disabled={isSubmitting} withWrapper />
          <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} disabled={isSubmitting} withWrapper />
          <RHFPasswordField
            control={control}
            register={register}
            name={'confirmPassword'}
            formKey={'confirm_password'}
            disabled={isSubmitting}
            withWrapper
          />
          <ChangePasswordButton />
        </div>
      </form>
    </FormProvider>
  )
}

export default AccountChangePasswordForm
