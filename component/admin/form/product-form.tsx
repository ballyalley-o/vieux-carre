'use client'

import { FC, useEffect } from 'react'
import { en } from 'public/locale'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useToast } from 'hook'
import slugify from 'slugify'
import { productDefaultValue, ProductSchema, UpdateProductSchema, capitalize, createProduct, updateProduct, delay } from 'lib'
import { Form } from 'component/ui'
import { LoadingBtn } from 'component/shared/btn'
import { RHFFormField } from 'component/shared/rhf'
import { PATH_DIR } from 'config'

const ProductForm: FC<ProductForm> = ({ type, product, productId }) => {
  const router    = useRouter()
  const { toast } = useToast()
  const form      = useForm<Product>({
    resolver     : type === 'update' ? zodResolver(UpdateProductSchema) : zodResolver(ProductSchema),
    defaultValues: product && type === 'update' ? product : productDefaultValue
  })

  const { control, formState, handleSubmit } = form

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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formState.isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    const handleRouteChange = () => {
      if (formState.isDirty && !window.confirm(en.message.unsaved_changes.description)) {
        return false
      }
      return true
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    const originalPush = router.push
    router.push = async (path, options) => {
      if (handleRouteChange()) {
        originalPush(path, options)
      }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      router.push = originalPush
    }
  }, [formState.isDirty, router])

  return (
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
        <div className="upload-field flex flex-col md:flex-row gap-4">{/* images */}</div>
        <div className="upload-field">{/* isfeatured */}</div>
        <div>
          <RHFFormField control={control} name={'description'} formKey={'description'} type={'textarea'} withWrapper={false} />
        </div>
        <div>
          <LoadingBtn
            isPending={formState.isSubmitting}
            label={`${capitalize(type)} Product`}
            disabled={formState.isSubmitting}
            className={'ml-auto max-w-sm sm:w-full'}
            icon={<Plus size={20} />}
          />
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
