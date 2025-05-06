"use client"

import { z, ZodSchema } from 'zod'
import { en } from 'public/locale'
import { Control, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import { useToast } from 'hook'
import { deleteProductImage } from 'lib/action'
import { X } from 'lucide-react'
import { FormField, FormLabel, FormMessage, FormItem, FormControl } from 'component/ui/form'
import { Card, CardContent } from 'component/ui/card'
import { IMAGE } from 'config/layout'
import { PATH_DIR } from 'config'

type FormKeyLocale = keyof typeof en.form

interface RHFFormDropzoneProps<TSchema extends ZodSchema> {
  control: Control<z.infer<TSchema>>
  formKey: FormKeyLocale
  images : string[]
  name   : FieldName
  form   : UseFormReturn<z.infer<TSchema>>
}

const RHFFormDropzone = <TSchema extends ZodSchema>({ control, name, images, formKey, form }: RHFFormDropzoneProps<TSchema>) => {
  const { toast } = useToast()

  const handleUploadComplete = (res: { url: string }[]) => {
    const currentImages = form.getValues(name) as string[]
    form.setValue(name, [...currentImages, ...res.map((r) => r.url)] as SetFieldName)
  }

  const handleDelete = async (index: number) => {
    const currentImages = form.getValues(name) as string[]
    const result        = await deleteProductImage({ currentImages, index })
    if (result?.success) {
      const updatedImages = currentImages.filter((_, _i) => _i != index)
      form.setValue(name, updatedImages as SetFieldName)
      toast({ description: en.success.image_deleted })
    } else {
      toast({ variant: 'destructive', description: en.error.unable_delete })
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files
     if (!files) return
     const urls: { url: string }[] = []
     for (const file of files) {
       const formData = new FormData()
       formData.append('file', file)
       try {
         const res = await fetch(PATH_DIR.UPLOAD, {
           method: 'POST',
           body  : formData
         })
         if (!res.ok) throw new Error(en.error.unable_delete)
         const data = await res.json()
         urls.push({ url: data.url })
       } catch (error: unknown) {
         toast({ variant: 'destructive', description: (error as AppError).message })
       }
     }
     if (urls.length) handleUploadComplete(urls)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={'w-full'}>
          <FormLabel>{en.form[formKey].label}</FormLabel>
          <Card>
            <CardContent className={'space-y-2 mt-2 min-h-48'}>
              <div className="flex-start space-x-2">
                {images.map((image, index) => (
                  <div key={index} className={'relative'}>
                    <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete(index)} />
                    <Image
                      key={index}
                      src={image}
                      height={IMAGE.UPLOAD_THUMBNAIL_H}
                      width={IMAGE.UPLOAD_THUMBNAIL_W}
                      alt={'product-name'}
                      className={'w-20 h-20 object-cover rounded-sm'}
                    />
                  </div>
                ))}
                <FormControl>
                  <input type="file" accept="image/*" multiple onChange={(e) => handleUpload(e)} className={'cursor-pointer'} />
                </FormControl>
              </div>
            </CardContent>
          </Card>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RHFFormDropzone
