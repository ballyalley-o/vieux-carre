'use client'

import { FC, Fragment, useEffect } from 'react'
import { en } from 'public/locale'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useFormState } from 'store'
import { useToast, usePreventNavigation } from 'hook'
import slugify from 'slugify'
import { Plus } from 'lucide-react'
import { productDefaultValue, ProductSchema, UpdateProductSchema, capitalize, createProduct, updateProduct, delay, cn } from 'lib'
import Image from 'next/image'
import { FormLabel } from 'component/ui/form'
import { Form, Card, CardContent } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'
import { RHFFormField, RHFFormDropzone, RHFCheckbox } from 'component/shared/rhf'
import { PATH_DIR } from 'config'
import { UploadDropzone } from 'lib/uploadthing'

const ProductForm: FC<ProductForm> = ({ type, product, productId }) => {
  const { toast }             = useToast()
  const { isDirty, setDirty } = useFormState()
  const router                = useRouter()
  const form                  = useForm<Product>({
    resolver: type === 'update' ? zodResolver(UpdateProductSchema) : zodResolver(ProductSchema),
    defaultValues: product && type === 'update' ? product : productDefaultValue
  })

  const { control, formState, handleSubmit } = form
  const images                               = form.watch('images')
  const isFeatured                           = form.watch('isFeatured')
  const banner                               = form.watch('banner')

  usePreventNavigation(isDirty)

  useEffect(() => {
    setDirty(formState.isDirty)
  }, [formState.isDirty, setDirty])

  const handleSlugify = () => {
    form.setValue('slug', slugify(form.getValues('name'), { lower: true }))
  }

  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    await delay(500)
    if (type === 'create') {
      const response = await createProduct(data)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      } else {
        toast({ description: response.message })
      }
      router.push(PATH_DIR.ADMIN.PRODUCT)
    }

    if (type === 'update') {
      if (!productId) {
        toast({ variant: 'destructive', description: en.error.product_not_found })
        router.push(PATH_DIR.ADMIN.PRODUCT)
        return
      }
      const response = await updateProduct({ ...data, id: productId })
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      } else {
        toast({ description: response.message })
      }
      router.push(PATH_DIR.ADMIN.PRODUCT)
    }
  }

  return (
    <Fragment>
      <Form {...form}>
        <form method={'POST'} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'name'} formKey={'name'} withWrapper={false} />
            <RHFFormField
              control={control}
              name={'slug'}
              formKey={'slug'}
              type={'inputWithButton'}
              withWrapper={false}
              buttonLabel={en.generate.label}
              onClick={handleSlugify}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'category'} formKey={'category'} withWrapper={false} />
            <RHFFormField control={control} name={'brand'} formKey={'brand'} withWrapper={false} />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <RHFFormField control={control} name={'price'} formKey={'price'} withWrapper={false} />
            <RHFFormField control={control} name={'stock'} formKey={'stock'} withWrapper={false} />
          </div>
          <div className="upload-field flex flex-col md:flex-row gap-4">
            <RHFFormDropzone control={control} name={'images'} formKey={'images'} images={images} form={form} />
          </div>
          <div className="upload-field gap-4 h-auto">
              <RHFFormField control={control} name={'description'} formKey={'description'} type={'textarea'} withWrapper={false} />
          </div>
          <div className="upload-field gap-4 h-auto">
              <RHFCheckbox control={control} name={'isFeatured'} formKey={'featured'} />
          </div>
          <div className="upload-field w-full gap-4">
           {isFeatured && <FormLabel>{en.form.banner.label}</FormLabel>}
            <Card className={cn('min-h-48 mt-2', isFeatured ? 'visible' : 'hidden')}>
              <CardContent  className={'w-full space-y-2 mt-2 min-h-48'}>
                {isFeatured && banner && (
                  <Image src={banner} alt={'featured-image'} width={1920} height={680} className={'w-full object-cover object-center rounded-sm'} />
                )}
                {isFeatured && !banner && (
                  <UploadDropzone endpoint={'imageUploader'} onClientUploadComplete={(res: { url: string }[]) => { form.setValue('banner', res[0].url ) }} onUploadError={(error: Error) => { toast({ variant: 'destructive', description: `[Error]: ${error.message}` })}} className={'border-none'} appearance={{ allowedContent: 'hidden', button: 'px-2', container: 'm-auto' }} />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <LoadingBtn
              isPending={formState.isSubmitting}
              label={`${capitalize(type)} Product`}
              disabled={formState.isSubmitting}
              className={'min-w-24 sm:w-full'}
              icon={<Plus size={20} />}
            />
          </div>
        </form>
      </Form>
    </Fragment>
  )
}

export default ProductForm
