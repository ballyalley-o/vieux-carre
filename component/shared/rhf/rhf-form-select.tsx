
import { Fragment, JSX } from 'react'
import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, ControllerRenderProps, Path } from 'react-hook-form'
import { FormField, FormControl, FormLabel, FormMessage, FormItem } from 'component/ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'component/ui/select'

type FormKeyLocale = keyof typeof en.form

interface RHFFormSelectProps<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
control       : Control<z.infer<TSchema>>
name          : TName
formKey       : FormKeyLocale
options      ?: string[]
icon         ?: JSX.Element
disabled     ?: boolean
className    ?: string
defaultOption?: string
}

interface RHFFormSelectControllerRender<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  field: ControllerRenderProps<z.infer<TSchema>, TName>
}

const RHFFormSelect = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, formKey,  options, icon, disabled = false,  className, defaultOption }: RHFFormSelectProps<TSchema, TName>) => {
  const FormFieldComponent = (
    <FormField
    control={control}
    name={name}
    render={({ field }: RHFFormSelectControllerRender<TSchema, TName>) => (
      <FormItem className={"w-full"}>
        <FormLabel>{en.form[formKey].label}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value.toString()}  defaultValue={defaultOption}>
          <FormControl>
            <SelectTrigger disabled={disabled}>
            <SelectValue placeholder={en.form[formKey].placeholder} defaultValue={defaultOption}/>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {Array.isArray(options) && options.map((option : string, index: number) => (
              <SelectItem key={index} value={option}>
               <div className={'relative py-0 text-center items-center flex'}>{option.toUpperCase()}&nbsp;<span>{icon && ( <Fragment>{icon}</Fragment>)}</span></div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}/>
  )

  return (
    <div className={className}>
      {FormFieldComponent}
    </div>
  )
}

export default RHFFormSelect
