'use client'

import { useEffect, useRef } from 'react'
import { z, ZodSchema } from 'zod'
import { Controller, Path, Control } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from 'component/ui/form'
import { Input } from 'component/ui/input'
import { parseAddress, transl } from 'lib'

interface RHFGoogleAddressAutocompleteProps<TSchema extends ZodSchema,TName extends Path<z.infer<TSchema>>> {
  control : Control<z.infer<TSchema>>
  name    : TName
  label  ?: string
  country?: string
}

const RHFGoogleAddressAutocomplete = <TSchema extends ZodSchema, TName extends Path<z.infer<TSchema>>>({ control, name, label, country = 'au' }: RHFGoogleAddressAutocompleteProps<TSchema, TName>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const fieldRef = useRef<((value: unknown) => void) | null>(null)

  useEffect(() => {
    if (!window.google || !inputRef.current) return

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country },
      fields: ['address_component', 'geometry']
    })

    autocomplete.addListener('place_changed', () => {
      const place                          = autocomplete.getPlace()
      const get                            = (type: string) => place.address_components?.find((c) => c.types.includes(type))?.long_name || ''
      const parsedAddress: ShippingAddress = {
        fullName     : '',
        streetAddress: `${get('street_number')} ${get('route')}`.trim(),
        city         : get('locality') || get('administrative_area_level_1'),
        postalCode   : get('postal_code'),
        country      : get('country'),
        latitude     : place.geometry?.location?.lat().toString() || '',
        longitude    : place.geometry?.location?.lng().toString() || ''
      }

      fieldRef.current?.(parsedAddress)
    })
  }, [control, name, country])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        fieldRef.current = field.onChange
        return (
          <FormField
          name={name}
          render={() => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input ref={inputRef} placeholder={transl('form.address.placeholder')} defaultValue={parseAddress(field.value) || ''} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        )
      }}
    />
  )
}

export default RHFGoogleAddressAutocomplete