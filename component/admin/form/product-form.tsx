'use client'

import { FC, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from 'hook'
import { productDefaultValue, ProductSchema, UpdateProductSchema } from 'lib'
import { Form } from 'component/ui'

const ProductForm: FC<ProductForm> = ({ type, product, productId}) => {
    const router    = useRouter()
    const { toast } = useToast()
    const form = useForm<Product>({
        resolver: zodResolver(type === 'update' ? UpdateProductSchema :  ProductSchema),
        defaultValues: product && type === 'update' ? product : productDefaultValue
    })

  return <Form {...form}>
    <form className='space-y-8'>
        <div className="flex flex-col md:flex-row gap-4">
            {/* name */}
            {/* slug */}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            {/* category */}
            {/* brand */}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            {/* price */}
            {/* stock */}
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-4">
            {/* images */}
        </div>
        <div className="upload-field">
            {/* isfeatured */}
        </div>
        <div>
            {/* description */}
        </div>
        <div>
            {/* submit */}
        </div>
    </form>
    {'Form'}</Form>
}

export default ProductForm
