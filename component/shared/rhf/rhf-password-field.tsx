'use client'

import { useState } from 'react'
import { en } from 'public/locale'
import { z, ZodSchema } from 'zod'
import { Control,ControllerRenderProps,  Path, useForm } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from 'component/ui'
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from 'component/ui/form'
import { transl, cn } from 'lib/util'
import { KEY } from "lib/constant"

type FormKeyLocale = keyof typeof en.form
interface RHFPasswordFieldProps <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
    register    : (name: TName) => ReturnType<ReturnType<typeof useForm>['register']>
    control     : Control<z.infer<TSchema>>
    name        : TName
    error      ?: string
    formKey     : FormKeyLocale
    className  ?: string
    disabled   ?: boolean
    withWrapper?: boolean
}

interface RHFFormPasswordFieldControllerRender<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  field: ControllerRenderProps<z.infer<TSchema>, TName>
}

const RHFPasswordField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ register, control,  name, className, formKey, disabled, withWrapper }: RHFPasswordFieldProps<TSchema, TName>) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

      const FormPasswordFieldComponent = (
        <FormField
        control={control}
        name={name}
        render={({ field }: RHFFormPasswordFieldControllerRender<TSchema, TName>) => (
             <FormItem className={"w-full"}>
               <FormControl>
                  <FormLabel className={cn(disabled ? 'text-muted-foreground opacity-25' : 'peer-invalid:text-red-600')}>{transl(`form.${formKey}.label` as const)}</FormLabel>
                </FormControl>
                 <div className="relative">
                    <Input
                      id={name}
                      aria-label={'password-toggle'}
                      {...register(name)}
                      type={showPassword ? KEY.TEXT : KEY.PASSWORD}
                      autoComplete={KEY.PASSWORD}
                      placeholder={transl(`form.${formKey}.placeholder` as const)}
                      disabled={disabled}
                      required
                       {...field}
                    />
                    <button type={'button'} onClick={togglePassword} className={cn('absolute inset-y-0 right-3 items-center flex', disabled ? 'text-muted-foreground opacity-25' : 'text-muted-foreground')}>
                      {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                  </div>
                 {!disabled && <FormMessage />}
             </FormItem>
        )} />
      )


      return withWrapper ? (
        <div className={cn('flex flex-col md:flex-row gap-5', className)}>{FormPasswordFieldComponent}</div>
      ) : (
        FormPasswordFieldComponent
      )
}

export default RHFPasswordField