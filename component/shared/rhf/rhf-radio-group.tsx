import { z, ZodSchema } from 'zod'
import { Control, Path } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage, FormLabel, RadioGroup, RadioGroupItem } from 'component/ui'

interface RHFRadioGroup<TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>> {
  control: Control<z.infer<TSchema>>
  name: TName
  group: string[]
}

const RHFRadioGroup = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, group }: RHFRadioGroup<TSchema, TName>) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[100px] items-center">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-6">
            <FormControl>
              <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-2">
                {group.map((item) => (
                  <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={item} checked={field.value === item} />
                    </FormControl>
                    <FormLabel className={'font-normal'}>{item}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default RHFRadioGroup
