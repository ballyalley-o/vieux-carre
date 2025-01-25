import { Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { BackBtn } from 'component/shared'
import { ProductForm } from 'component/admin'

export const metadata: Metadata = { title: 'Create Product | Admin' }

const AdminCreateProductPage = () => {
  return (
    <Fragment>
      <BackBtn/>
      <h2 className="h2-bold">{en.create_product.label}</h2>
      <div className="my-8">
        <ProductForm type={'create'} />
      </div>
    </Fragment>
  )
}

export default AdminCreateProductPage
