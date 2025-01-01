import { Fragment } from 'react'
import { getLatestProducts } from 'lib'
import { ProductList } from 'component'
import { GLOBAL } from 'config'
const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  return (
    <Fragment>
      <ProductList data={latestProducts} title={'Newest Arrivals'} limit={GLOBAL.LATEST_PRODUCT_QUANTITY} />
      <h1 className="text-8xl font-bold">{'Shop.Go.'}</h1>
      <h6 className="mt-4">This is the homepage.</h6>
    </Fragment>
  )
}

export default Homepage
