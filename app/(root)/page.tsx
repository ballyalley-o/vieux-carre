export const dynamic = 'force-dynamic'
import { Fragment } from 'react'
import { GLOBAL } from 'vieux-carre'
import { en } from 'public/locale'
import { getLatestProducts } from 'lib'
import { ProductList, ProductBtn } from 'component/shared/product'
import { DealCountdown } from 'component/shared/promo'
import { ServiceCard } from 'component/shared/card'

const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  return (
    <Fragment>
      <ProductList data={latestProducts} title={en.newest_arrivals.label} limit={GLOBAL.LATEST_PRODUCT_QUANTITY} />
      <ProductBtn />
      <ServiceCard />
      <DealCountdown />
    </Fragment>
  )
}

export default Homepage
