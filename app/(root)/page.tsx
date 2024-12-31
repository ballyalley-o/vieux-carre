import { Fragment } from 'react'
import { _mockData } from '__mock'
import { ProductList } from 'component'
const Homepage = () => {
  return (
    <Fragment>
      <ProductList data={_mockData.products} title={'Newest Arrivals'} limit={4} />
      <h1 className="text-8xl font-bold">{'Shop.Go.'}</h1>
      <h6 className="mt-4">This is the homepage.</h6>
    </Fragment>
  )
}

export default Homepage
