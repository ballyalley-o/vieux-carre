"use client"

import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, Path } from 'react-hook-form'
import { FormField, FormLabel, FormMessage, FormItem, FormControl } from 'component/ui/form'
import { Card, CardContent } from 'component/ui/card'
import { Checkbox } from 'component/ui'

type FormKeyLocale = keyof typeof en.form

interface RHFCheckboxProps<TSchema extends ZodSchema> {
  control: Control<z.infer<TSchema>>
  formKey: FormKeyLocale
  name   : Path<z.infer<TSchema>>
}

const RHFCheckbox = <TSchema extends ZodSchema>({ control, name, formKey }: RHFCheckboxProps<TSchema>) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className={"w-full"}>
            <FormLabel>{en.form[formKey].label}</FormLabel>
                <Card className={'border-none'}>
                    <CardContent className={'space-y-2 mt-2'}>
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange = {field.onChange} />
                        </FormControl>
                        <FormLabel> &nbsp; {en.form[formKey].placeholder}</FormLabel>
                    </CardContent>
                </Card>
            <FormMessage />
        </FormItem>
    )}/>
  )
}

export default RHFCheckbox
