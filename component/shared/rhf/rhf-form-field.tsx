import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, ControllerRenderProps, Path } from 'react-hook-form'
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from 'component/ui/form'
import { Input } from 'component/ui/input'

type FormKeyLocale = keyof typeof en.form

interface RHFFormFieldProps<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  control: Control<z.infer<TSchema>>
  name: TName
  formKey: FormKeyLocale
}

interface RHFFormFieldControllerRender<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  field: ControllerRenderProps<z.infer<TSchema>, TName>
}

const RHFFormField = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, formKey }: RHFFormFieldProps<TSchema, TName>) => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <FormField
        control={control}
        name={name}
        render={({ field }: RHFFormFieldControllerRender<TSchema, TName>) => (
          <FormItem className="w-full">
            <FormControl>
              <FormLabel>{en.form[formKey].label}</FormLabel>
            </FormControl>
            <Input placeholder={en.form[formKey].placeholder} {...field} />
            <FormMessage />
          </FormItem>
        )}/>
    </div>
  )
}

export default RHFFormField
