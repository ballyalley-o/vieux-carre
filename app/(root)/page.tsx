import { Fragment } from 'react'
import { getLatestProducts, getAllFeaturedProducts } from 'lib'
import { ProductList, ProductCarousel, ProductBtn } from 'component/shared'
import { DealCountdown } from 'component/shared/promo'
import { ServiceCard } from 'component/shared/card'
import { GLOBAL } from 'config'

const Homepage = async () => {
  const latestProducts   = await getLatestProducts()
  const featuredProducts = await getAllFeaturedProducts()
  return (
    <Fragment>
     {featuredProducts.length > 0  && <ProductCarousel products={featuredProducts} />}
      <ProductList data={latestProducts} title={'Newest Arrivals'} limit={GLOBAL.LATEST_PRODUCT_QUANTITY} />
      <ProductBtn />
      <ServiceCard/>
      <DealCountdown />
    </Fragment>
  )
}

export default Homepage
