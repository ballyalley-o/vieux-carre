import { Fragment } from 'react'
import { GLOBAL } from 'vieux-carre'
import { getLatestProducts, getDealOfTheMonthProduct } from 'lib/action'
import { ProductList, ProductBtn } from 'component/shared/product'
import { DealCountdown } from 'component/shared/promo'
import { ServiceCard } from 'component/shared/card'
import { transl } from 'lib/util'

const Homepage = async () => {
  const [latestProducts, dotmProduct] = await Promise.all([getLatestProducts(), getDealOfTheMonthProduct()])
  return (
    <Fragment>
      <ProductList data={latestProducts} title={transl('newest_arrivals.label')} limit={GLOBAL.LATEST_PRODUCT_QUANTITY} />
      <ProductBtn />
      <ServiceCard />
      <DealCountdown product={dotmProduct} />
    </Fragment>
  )
}

export default Homepage
