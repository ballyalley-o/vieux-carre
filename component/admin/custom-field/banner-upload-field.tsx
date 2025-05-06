/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Fragment } from 'react'
import { en } from 'public/locale'
import { PATH_DIR } from 'config'
import Image from 'next/image'
import { z, ZodSchema } from 'zod'
import { useToast } from 'hook'
import { UseFormReturn } from 'react-hook-form'
import { cn } from 'lib'
import { deleteProductImage } from 'lib/action'
import { X } from 'lucide-react'
import { Card, CardContent, FormLabel, FormControl } from 'component/ui'

interface BannerUploadFieldProps<TSchema extends ZodSchema>{
  isFeatured            : boolean
  banner                : string
  form                  : UseFormReturn<z.infer<TSchema>>
}
const BannerUploadField = <TSchema extends ZodSchema>({ isFeatured, banner, form }: BannerUploadFieldProps<TSchema>) => {
    const { toast }                           = useToast()

    const handleUploadComplete = (res: { url: string }) => {
      form.setValue('banner' as FieldName, res.url as SetFieldName)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append('file', file)
        try {
          const res = await fetch(PATH_DIR.UPLOAD, {
            method: 'POST',
            body  : formData
          })
          if (!res.ok) throw new Error(en.error.unable_delete)
          const data = await res.json()
          handleUploadComplete({ url: data.url })
        } catch (error: unknown) {
          toast({ variant: 'destructive', description: (error as AppError).message })
        }
    }

    const handleDelete = async () => {
      const currentImage = form.getValues('banner' as FieldName)
      const result = await deleteProductImage({ currentImages: currentImage })
      if (result?.success) {
        form.setValue('banner' as FieldName, '' as SetFieldName)
        toast({ description: en.success.image_deleted })
      } else {
        toast({ variant: 'destructive', description: en.error.unable_delete })
      }
    }


    return (
      <Fragment>
        {isFeatured && <FormLabel>{en.form.banner.label}</FormLabel>}
        <Card className={cn('mt-2', isFeatured ? 'visible' : 'hidden')}>
          <CardContent className={'space-y-2 mt-5 min-h-48'}>
            {isFeatured && banner && (
              <div className={'relative'}>
                <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete()} />
                <Image src={banner} alt={'featured-image'} width={1920} height={680} className={'w-full object-cover object-center rounded-sm'} />
              </div>
            )}
            {isFeatured && !banner && (
              <FormControl>
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e)} className={'cursor-pointer'} />
              </FormControl>
            )}
          </CardContent>
        </Card>
      </Fragment>
    )
}

export default BannerUploadField;