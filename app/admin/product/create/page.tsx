import { Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { ProductForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: 'Create Product | Admin' }

const AdminCreateProductPage = () => {
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.PRODUCT} withLink />
      <h2 className="h2-bold">{en.create_product.label}</h2>
      <div className="my-8">
        <ProductForm type={'create'} />
      </div>
    </Fragment>
  )
}

export default AdminCreateProductPage
