'use client'

import { useState } from 'react'
import { PATH_DIR } from 'vc.dir'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from 'hook'
import { signInWithCredentials } from 'lib/action'
import { Button } from 'component/ui/button'
import { AppAuthRedir } from 'component/shared/app'
import { RHFPasswordField, RHFFormField } from 'component/shared/rhf'
import { GoogleSignInBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { Separatr } from 'component/shared/separatr'
import { KEY, SignInSchema, transl } from 'lib'

const SignInForm = () => {
  const [oAuth, setOAuth]                       = useState(false)
  const [isOAuthIsLoading, setIsOAuthIsLoading] = useState(false)
  const searchParams                            = useSearchParams()
  const callbackUrl                             = searchParams.get(KEY.CALLBACK_URL) || PATH_DIR.ROOT
  const { toast }                               = useToast()
  const router                                  = useRouter()
  const form                                    = useForm<SignIn>({ resolver: zodResolver(SignInSchema), defaultValues: { email: '', password: '' } })

  const { register, control, formState: { isSubmitting }, handleSubmit } = form

  const SignInButton = () => {
    return (
      <div className="mb-5">
        <Button disabled={isSubmitting || oAuth} className="w-full" variant={'default'}>
          {isSubmitting ? <EllipsisLoader /> : transl('sign_in.label')}
        </Button>
      </div>
    )
  }

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    try {
      const response = await signInWithCredentials(data)
      if (response.success) {
        toast({ description: response.message })
        router.push(PATH_DIR.ROOT)
      } else {
        toast({ variant: 'destructive',description: response.message })
      }
    } catch (error) {
      toast({ variant: 'destructive', description: (error as AppError).message })
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name={KEY.CALLBACK_URL} value={callbackUrl} />
        <div className={"space-y-6"}>
          <RHFFormField control={control} name={'email'} formKey={'email'} disabled={oAuth} withWrapper />
          <RHFPasswordField control={control} register={register} name={'password'} formKey={'password'} disabled={oAuth} />
          <div>
            <SignInButton />
            <Separatr label={transl('or.label')} />
            <GoogleSignInBtn loading={isOAuthIsLoading} onClick={() => { setOAuth(true);  setIsOAuthIsLoading(true) }} />
          </div>
          <AppAuthRedir type={'sign-in'} />
        </div>
      </form>
    </FormProvider>
  )
}

export default SignInForm
