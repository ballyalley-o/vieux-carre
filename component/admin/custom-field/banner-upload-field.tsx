/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Fragment, useState } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import Image from 'next/image'
import { z, ZodSchema } from 'zod'
import { useToast } from 'hook'
import { UseFormReturn, PathValue, Path } from 'react-hook-form'
import { cn } from 'lib'
import { deleteProductImage } from 'lib/action'
import { UploadButton } from 'lib/uploadthing'
import { CloudUpload, File, X } from 'lucide-react'
import { Button, Card, CardContent, FormLabel, Progress, FormControl } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'

interface BannerUploadFieldProps<TSchema extends ZodSchema>{
  isFeatured            : boolean
  banner                : string
  onClientUploadComplete: (res: { url: string }[]) => void
  form                  : UseFormReturn<z.infer<TSchema>>
}
const BannerUploadField = <TSchema extends ZodSchema>({ isFeatured, banner, onClientUploadComplete, form }: BannerUploadFieldProps<TSchema>) => {
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [selectedFile, setSelectedFile]     = useState<string>('')
    const { toast }                           = useToast()
    const uploadDropzoneConfig = {
        button        :  ({ ready, fileSelected }: { ready: boolean, fileSelected?: boolean }) => (
          <div className="flex flex-col items-center gap-2">
              <Button
                  variant={'secondary'}
                  className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md",
                      "text-muted-foreground",
                      !ready && "opacity-50 cursor-not-allowed"
                  )}
                  type="button"
                  disabled={!ready}>
                  {uploadProgress > 0 ? (
                      <div className="flex flex-col w-full gap-1">
                          <span> <EllipsisLoader/> {uploadProgress}%</span>
                          <Progress value={uploadProgress} className="w-24 h-1" />
                      </div>
                  ) : (
                    en.upload_banner.label
                  )}
              </Button>
          </div>
      ),
        uploadIcon    : <CloudUpload size={20} />,
        label: () => (
          <div className="flex flex-col items-center gap-1">
              {selectedFile ? (
                  <div className="flex items-center gap-2 text-sm">
                      <File size={16} className="text-primary" />
                      <span className="font-medium text-primary">{selectedFile}</span>
                  </div>
              ) : (
                  <div className="text-sm text-muted-foreground">
                      {en.upload_banner.description}
                  </div>
              )}
          </div>
      ),
        allowedContent: GLOBAL.UPLOADTHING.ALLLOWED_IMAGE_TYPE
    }

    const handleDelete = async (index: number) => {
      const result = await deleteProductImage(banner, index)
      if (result?.success) {
        form.setValue('banner' as Path<z.infer<TSchema>>, '' as PathValue<z.infer<TSchema>, Path<z.infer<TSchema>>>)
        toast({ description: 'File deleted' })
      } else {
        toast({ variant: 'destructive', description: 'Failed to delete file from server' })
      }
    }
    return (
      <Fragment>
        {isFeatured && <FormLabel>{en.form.banner.label}</FormLabel>}
        <Card className={cn('mt-2', isFeatured ? 'visible' : 'hidden')}>
          <CardContent className={'space-y-2 mt-5 min-h-48'}>
            {isFeatured && banner && (
              <div className={'relative'}>
                <X size={20} color={'red'} className={'absolute top-0 right-0 cursor-pointer'} onClick={() => handleDelete(0)} />
                <Image src={banner} alt={'featured-image'} width={1920} height={680} className={'w-full object-cover object-center rounded-sm'} />
              </div>
            )}
            {isFeatured && !banner && (
              <FormControl>
                <UploadButton
                  endpoint={'imageUploader'}
                  onClientUploadComplete={(res) => {
                    setUploadProgress(0)
                    setSelectedFile('')
                    onClientUploadComplete(res)
                  }}
                  onUploadError={(error: Error) => {
                    toast({ variant: 'destructive', description: error.message })
                  }}
                  className={'border-none'}
                  appearance={{ button: 'px-2 bg-transparent', container: 'm-auto' }}
                />
              </FormControl>
            )}
          </CardContent>
        </Card>
      </Fragment>
    )
}

export default BannerUploadField;