/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { FC, Fragment, useState } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import Image from 'next/image'
import { useToast } from 'hook'
import { cn } from 'lib'
import { UploadDropzone } from 'lib/uploadthing'
import { CloudUpload, File } from 'lucide-react'
import { Button, Card, CardContent, FormLabel, Progress } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'

interface BannerUploadFieldProps {
    isFeatured            : boolean
    banner                : string
    onClientUploadComplete: (res: { url: string }[]) => void
}
const BannerUploadField: FC<BannerUploadFieldProps> = ({ isFeatured, banner, onClientUploadComplete }) => {
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
    return (
      <Fragment>
        {isFeatured && <FormLabel>{en.form.banner.label}</FormLabel>}
        <Card className={cn('mt-2', isFeatured ? 'visible' : 'hidden')}>
          <CardContent className={'space-y-2 mt-5 min-h-48'}>
            {isFeatured && banner && (
              <Image src={banner} alt={'featured-image'} width={1920} height={680} className={'w-full object-cover object-center rounded-sm'} />
            )}
            {isFeatured && !banner && (
              <UploadDropzone
                content={uploadDropzoneConfig}
                endpoint={'imageUploader'}
                onClientUploadComplete={(res) => {
                  setUploadProgress(0);
                  setSelectedFile('');
                  onClientUploadComplete(res);
                }}
                onUploadProgress={(progress) => {
                  setUploadProgress(Math.round(progress))
                }}
                onUploadError={(error: Error) => {
                  setUploadProgress(0)
                  setSelectedFile('')
                  toast({ variant: 'destructive', description: error.message })
                }}
                onBeforeUploadBegin={(files) => {
                  if (files.length > 0) {
                    setSelectedFile(files[0].name);
                  }
                return files;
              }}
                className={'border-none align-center'}
                appearance={{ button: 'px-2 bg-transparent' }}
              />
            )}
          </CardContent>
        </Card>
      </Fragment>
    )
}

export default BannerUploadField;