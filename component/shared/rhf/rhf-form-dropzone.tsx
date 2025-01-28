"use client"

import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, Path, PathValue, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import { useToast } from 'hook'
import { FormField, FormLabel, FormMessage, FormItem, FormControl } from 'component/ui/form'
import { Card, CardContent } from 'component/ui/card'
import { IMAGE } from 'config/layout'
import { UploadButton } from 'lib/uploadthing'

type FormKeyLocale = keyof typeof en.form

interface RHFFormDropzoneProps<TSchema extends ZodSchema> {
  control: Control<z.infer<TSchema>>
  formKey: FormKeyLocale
  images : string[]
  name   : Path<z.infer<TSchema>>
  form   : UseFormReturn<z.infer<TSchema>>
}

const RHFFormDropzone = <TSchema extends ZodSchema>({ control, name, images, formKey, form }: RHFFormDropzoneProps<TSchema>) => {
  const { toast } = useToast()

  const handleUploadComplete = (res: { url: string }[]) => {
    const currentImages = form.getValues(name) as string[]
    form.setValue(name, [...currentImages, res[0].url] as PathValue<z.infer<TSchema>, Path<z.infer<TSchema>>>)
  };
  return (
    <FormField
        control={control}
        name={name}
        render={() => (
        <FormItem className={"w-full"}>
            <FormLabel>{en.form[formKey].label}</FormLabel>
                <Card>
                    <CardContent className={'space-y-2 mt-2 min-h-48'}>
                        <div className="flex-start space-x-2">
                            {images.map((image, index) => (
                                <Image key={index} src={image} height={IMAGE.UPLOAD_THUMBNAIL_H} width={IMAGE.UPLOAD_THUMBNAIL_W} alt={'product-name'} className={'w-20 h-20 object-cover rounded-sm'}  />
                            ))}
                            <FormControl>
                              <UploadButton endpoint={'imageUploader'} onClientUploadComplete={handleUploadComplete} onUploadError={(error: Error) => { toast({ variant: 'destructive', description: error.message })}} className={'border-none w-full'} />
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            <FormMessage />
        </FormItem>
    )}/>
  )
}

export default RHFFormDropzone
