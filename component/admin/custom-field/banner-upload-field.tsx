"use client"

import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import Image from 'next/image'
import { useToast } from 'hook'
import { cn } from 'lib'
import { CloudUpload } from 'lucide-react'
import { Card, CardContent, FormLabel } from 'component/ui'
import { UploadDropzone } from 'lib/uploadthing'

interface BannerUploadFieldProps {
    isFeatured            : boolean
    banner                : string
    onClientUploadComplete: (res: { url: string }[]) => void
}
const BannerUploadField: FC<BannerUploadFieldProps> = ({ isFeatured, banner, onClientUploadComplete }) => {
    const { toast } = useToast()
    const uploadDropzoneConfig = {
        button        : en.upload_banner.label,
        uploadIcon    : <CloudUpload size={20} />,
        label         : en.upload_banner.description,
        allowedContent: GLOBAL.UPLOADTHING.ALLLOWED_IMAGE_TYPE
    }
    return (
    <Fragment>
        {isFeatured && <FormLabel>{en.form.banner.label}</FormLabel>}
        <Card className={cn('mt-2', isFeatured ? 'visible' : 'hidden')}>
          <CardContent  className={'space-y-2 mt-5 min-h-48'}>
            {isFeatured && banner && (
              <Image src={banner} alt={'featured-image'} width={1920} height={680} className={'w-full object-cover object-center rounded-sm'} />
            )}
            {isFeatured && !banner && (
              <UploadDropzone content={uploadDropzoneConfig} endpoint={'imageUploader'} onClientUploadComplete={onClientUploadComplete} onUploadError={(error: Error) => { toast({ variant: 'destructive', description: error.message })}} className={'border-none align-center'} appearance={{  button: 'px-2 bg-transparent' }} />
            )}
          </CardContent>
        </Card>
    </Fragment>
     );
}

export default BannerUploadField;