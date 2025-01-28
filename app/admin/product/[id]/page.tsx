import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { getProductById } from 'lib'
import { notFound } from 'next/navigation'
import { ProductForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: 'Update Product | Admin' }

interface AdminProductUpdatePageProps {
  params: Promise<{ id: string }>
}
const AdminProductUpdatePage: FC<AdminProductUpdatePageProps> = async ({ params }) => {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return notFound()
  return (
    <Fragment>
      <FormBackBtn href={PATH_DIR.ADMIN.PRODUCT} withLink />
      <h1 className="h2-bold">{en.update_product.label}</h1>
      <ProductForm type={'update'} product={product} productId={product.id} />
    </Fragment>
  )
}

export default AdminProductUpdatePage
