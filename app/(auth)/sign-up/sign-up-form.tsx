'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from 'hook'
import { signUpUser } from 'lib/action/user.action'
import { Button } from 'component/ui/button'
import { AppAuthRedir } from 'component/shared/app'
import { RHFFormField, RHFPasswordField } from 'component/shared/rhf'
import { EllipsisLoader } from 'component/shared/loader'
import { PATH_DIR } from 'config'
import { delay, KEY, signUpDefaultValue, SignUpSchema, transl } from 'lib'

const SignUpForm = () => {
  const searchParams   = useSearchParams()
  const callbackUrl    = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT
  const { toast }      = useToast()
  const router         = useRouter()
  const form           = useForm<SignUp>({ resolver: zodResolver(SignUpSchema), defaultValues: signUpDefaultValue })

  const { register, control, formState: { isSubmitting }, handleSubmit } = form

  const SignUpButton = () => {
    return (
      <div className={'mb-5'}>
        <Button disabled={isSubmitting} className="w-full" variant={'default'}>
          {isSubmitting ? <EllipsisLoader /> : transl('sign_up.label')}
        </Button>
      </div>
    )
  }

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    try {
      const response = await signUpUser(data)
      console.log('response in form: ', response)
      if (response.success === true) {
        await delay(500)
        toast({ description: response.message })
        router.push(PATH_DIR.ROOT)
      } else {
        toast({ variant: 'destructive', description: response.message })
      }
    } catch (error) {
      toast({ variant: 'destructive', description: (error as AppError).message })
    }
  }
  return (
    <FormProvider {...form}>
      <form method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name={KEY.CALLBACK_URL} value={callbackUrl} />
        <div className={'space-y-6'}>
          <RHFFormField control={control} name={'name'} formKey={'name'} disabled={isSubmitting} withWrapper />
          <RHFFormField control={control} name={'email'} formKey={'email'} disabled={isSubmitting} withWrapper />
          <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} disabled={isSubmitting} withWrapper />
          <RHFPasswordField
            control={control}
            register={register}
            name={'confirmPassword'}
            formKey={'confirm_password'}
            disabled={isSubmitting}
            withWrapper
          />
          <SignUpButton />
          <AppAuthRedir type={'sign-up'} />
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUpForm
