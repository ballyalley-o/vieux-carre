"use client"

import { useState, useTransition } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendPasswordResetEmail } from 'lib/action'
import { ForgotPasswordSchema } from 'lib/schema'
import { useToast } from 'hook'
import { CircleCheckBigIcon } from 'lucide-react'
import { Button } from 'component/ui'
import { RHFFormField } from 'component/shared/rhf'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib/util'

const ForgotPasswordForm = () => {
  const [isSent, setIsSent]          = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()
  const form                         = useForm<ForgotPassword>({
    resolver     : zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const { handleSubmit, control, formState: { isSubmitting } } = form

  const ResetPasswordButton = () => {
    return (
      <div className={'mb-5'}>
        <Button variant={'default'} className={'w-full'} disabled={isSubmitting || isSent}>
          {isPending ? <EllipsisLoader /> : transl('reset_password.button')}
        </Button>
      </div>
    )
  }

  const onSubmit: SubmitHandler<ForgotPassword> = async (data) => {
    startTransition(async () => {
      const response = await sendPasswordResetEmail(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      toast({ description: response.message })
      setIsSent(true)
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'space-y-6'}>
          {isSent ? (
            <div className={'flex items-center justify-center'}>
              <CircleCheckBigIcon />
            </div>
          ) : (
            <div>
              <RHFFormField control={control} name={'email'} formKey={'email'} />
            </div>
          )}
          <div>
            {isSent ? (
              <div className={'mb-5 flex items-center justify-center'}>
                <p className={'text-md md:text-xl text-punk dark:text-tape'}>{transl('message.password_reset_sent.description')}</p>
              </div>
            ) : (
              <ResetPasswordButton />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ForgotPasswordForm
