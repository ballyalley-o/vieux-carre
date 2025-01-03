import { FC } from 'react'
import { notFound } from 'next/navigation'
import { getProductBySlug } from 'lib'
import { Button, Card, CardContent, Badge, ProductPrice, ProductImage } from 'component'

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>
}
const ProductDetailsPage: FC<ProductDetailsPageProps> = async ({ params }) => {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const productStatus = product.stock > 0 ? <Badge variant="outline">{'In Stock'}</Badge> : <Badge variant="destructive">{'Out of Stock'}</Badge>
  const renderAddToCartButton =
    product.stock > 0 ? <Button className="w-full rounded-sm">{'Add to Cart'}</Button> : <Button disabled>{'Out of Stock'}</Button>

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-2">
          <ProductImage images={product.images} />
        </div>
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>
              {product.brand} {product.category}
            </p>
            <h1 className="h3-bold">{product.name}</h1>
            <p>
              {product.rating} of {product.numReviews} {'Reviews'}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ProductPrice value={Number(product.price)} className="w-24 rounded-sm bg-green-100 text-green-700 px-5 py-2" />
            </div>
            <div className="mt-10">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <div>
          <Card className="rounded-sm shadow-none">
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <div className="">{'Price'}</div>
                <div className="">
                  <ProductPrice value={Number(product.price)} />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>{'Status'}</div>
                {productStatus}
              </div>
              {renderAddToCartButton}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsPage
