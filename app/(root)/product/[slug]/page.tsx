import { FC, Fragment } from 'react'
import { notFound } from 'next/navigation'
import { auth } from 'vieux-carre.authenticate'
import { Handshake } from 'lucide-react'
import { Card, CardContent, Badge } from 'component/ui'
import { ProductPrice, ProductImage } from 'component/shared/product'
import { AddToBag, ProductRating } from 'component/shared'
import { ReviewList } from 'component/shared/review'
import { BackBtn } from 'component/shared/btn'
import { getProductBySlug, getMyBag, transl } from 'lib'

interface ProductViewPageProps {
  params: Promise<{ slug: string }>
}
const ProductViewPage: FC<ProductViewPageProps> = async ({ params }) => {
  const { slug } = await params
  const product  = await getProductBySlug(slug)
  if (!product) return notFound()
  const session = await auth()
  const userId  = session?.user?.id
  const bag     = await getMyBag()

  const bagProduct = { productId: product.id, name: product.name, slug: product.slug, price: product.price, qty: 1, image: product.images![0] }

  const productStatus = product.stock > 0 ? <Badge variant="outline">{transl('in_stock.label')}</Badge> : <Badge variant="destructive">{transl('out_of_stock.label')}</Badge>
  const renderAddToBagButton = product.stock > 0 ? <AddToBag bag={bag} item={bagProduct} /> : null

  return (
    <Fragment>
    <div className={"mb-12"}>
        <BackBtn />
    </div>
    <section>
      <div className={"grid grid-cols-1 md:grid-cols-5"}>
        <div className={"col-span-2"}><ProductImage images={product.images} /></div>
        <div className={"col-span-2 p-5"}>
          <div className={"flex flex-col gap-6"}>
            {product?.isDotm  && <div className={'flex justify-start'}><Badge variant={'secondary'} className={'text-xs content-start gap-2'}><Handshake size={15} /><p>{transl('deal_of_the_month.label')}</p></Badge></div>}
            <div className={'flex justify-between items-center'}>{product.brand} {product.category}</div>
            <h2 className={"h3-bold"}>{product.name}</h2>
              <ProductRating value={Number(product.rating)}/>
            <p>{product.numReviews} {product.numReviews > 1 ? transl('review.reviews.label') : transl('review.label')}</p>
            <div className={"mt-10"}><p>{product.description}</p></div>
          </div>
        </div>
        <div>
          <Card className={"rounded-sm shadow-none"}>
            <CardContent className={"p-4"}>
              <div className={"mb-2 flex justify-between"}>
                <div>{transl('price.label')}</div>
                <ProductPrice value={Number(product.price)} />
              </div>
              <div className={"mb-2 flex justify-between"}>
                <div>{transl('status.label')}</div>
                {productStatus}
              </div>
              <div className={"flex-center gap-5 mt-5"}>{renderAddToBagButton}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    <section className={'mt-10'}>
      <h2 className={"h2-bold mb-5"}>{transl('customer_review.customer_reviews.label')}</h2>
      <ReviewList userId={userId || ''} productId={product.id} productSlug={product.slug} />
    </section>
    </Fragment>
  )
}

export default ProductViewPage
