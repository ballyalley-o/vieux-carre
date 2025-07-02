import { Fragment } from 'react'
import { GLOBAL } from 'vieux-carre'
import { getLatestProducts, transl } from 'lib'
import { ProductList, ProductBtn } from 'component/shared/product'
import { DealCountdown } from 'component/shared/promo'
import { ServiceCard } from 'component/shared/card'

const Homepage = async () => {
  // const latestProducts = await getLatestProducts()
  let latestProducts = []

  try {
    latestProducts = await getLatestProducts()
  } catch (err) {
    console.error('Failed to fetch latest products:', err)
    // Optionally return fallback UI
    return <div>Failed to load products.</div>
  }
  return (
    <Fragment>
      <ProductList data={latestProducts} title={transl('newest_arrivals.label')} limit={GLOBAL.LATEST_PRODUCT_QUANTITY} />
      <ProductBtn />
      <ServiceCard />
      <DealCountdown />
    </Fragment>
  )
}

export default Homepage
