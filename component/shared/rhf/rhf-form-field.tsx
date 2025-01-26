
import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, ControllerRenderProps, Path } from 'react-hook-form'
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from 'component/ui/form'
import { Input } from 'component/ui/input'
import { Button } from 'component/ui/button'
import { cn } from 'lib/util'
import { Textarea } from 'component/ui'

type FormKeyLocale = keyof typeof en.form
type FormFieldType = 'input' | 'inputWithButton' | 'textarea'

interface RHFFormFieldProps<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  control     : Control<z.infer<TSchema>>
  name        : TName
  formKey     : FormKeyLocale
  type       ?: FormFieldType
  disabled   ?: boolean
  className  ?: string
  withWrapper?: boolean
  withButton ?: boolean
  buttonLabel?: string
  onClick    ?: () => void
}

interface RHFFormFieldControllerRender<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  field: ControllerRenderProps<z.infer<TSchema>, TName>
}

const RHFFormField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, formKey, disabled = false, withWrapper = true, className, type = 'input', buttonLabel, onClick }: RHFFormFieldProps<TSchema, TName>) => {


  const FormFieldComponent = (
    <FormField
    control={control}
    name={name}
    render={({ field }: RHFFormFieldControllerRender<TSchema, TName>) => (
      <FormItem className={"w-full"}>
        <FormControl>
          <FormLabel>{en.form[formKey].label}</FormLabel>
        </FormControl>
        {
        type === 'inputWithButton' ? (
          <div className={'flex flex-row items-center gap-2'}>
            <Input disabled={disabled} placeholder={en.form[formKey].placeholder} {...field} />
           <span><Button type={'button'} variant={'secondary'} className={''} onClick={onClick}>{buttonLabel}</Button></span>
          </div>
        )
        :
        type === 'textarea' ? (
          <Textarea disabled={disabled} placeholder={en.form[formKey].placeholder} {...field} className={'resize-none'} />
        )
        :
        type === 'input' ?
        (
          <Input disabled={disabled} placeholder={en.form[formKey].placeholder} {...field} />
        ):
        (
          <Input disabled={disabled} placeholder={en.form[formKey].placeholder} {...field} />
        )}
        <FormMessage />
      </FormItem>
    )}/>
  )

  return withWrapper ?  (
    <div className={cn("flex flex-col md:flex-row gap-5", className)}>
      {FormFieldComponent}
    </div>
  ) : FormFieldComponent
}

export default RHFFormField
