"use client"

import { useEffect, useTransition } from 'react'
import { PATH_DIR } from 'vc.dir'
import { redirect, useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordWithToken } from 'lib/action'
import { ResetPasswordSchema } from 'lib/schema'
import { useToast } from 'hook'
import { Button, Input } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { RHFPasswordField, RHFFormField } from 'component/shared/rhf'
import { delay, transl } from 'lib/util'

const ResetPasswordForm = ({ token, verifiedUserEmail }: { token: string, verifiedUserEmail: string }) => {
  const [isPending, startTransition]    = useTransition()
  const router                          = useRouter()
  const { toast }                       = useToast()
  const form                            = useForm<ResetPassword>({
    resolver     : zodResolver(ResetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' }
  })

  const { handleSubmit, register, control, formState: { isSubmitting } } = form

  if (!token) {
    redirect(PATH_DIR.PASSWORD_FORGOT)
  }

  useEffect(() => {
    async function validateTokenAndPrefillEmail() {
      if (!token) return
        form.setValue('email', verifiedUserEmail)
    }
    validateTokenAndPrefillEmail()
  }, [token])

  const ResetPasswordButton = () => {
    return (
      <div className={"mb-5"}>
        <Button variant={'default'} className={'w-full'} disabled={isSubmitting}>
         {isPending ? <EllipsisLoader /> : transl('change_password.label')}
        </Button>
      </div>
    )
  }

  const onSubmit = async (data: { token: string, password: string, confirmPassword: string }) => {
    startTransition(async () => {
      const response = await resetPasswordWithToken(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      await delay(500)
      toast({ description: response.message })
      router.push(PATH_DIR.SIGN_IN)
    })
  }

  return (
  <FormProvider {...form}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'space-y-6'}>
        <div>
          <RHFFormField control={control} name={'email'} formKey={'email'} disabled={true} />
        </div>
          <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} />
          <RHFPasswordField control={control} register={register} name={'confirmPassword'} formKey={'confirm_password'} />
        <div>
          <ResetPasswordButton />
        </div>
        <Input type="hidden" {...register('token')} required />
      </div>
    </form>
  </FormProvider>
  )
}

export default ResetPasswordForm
