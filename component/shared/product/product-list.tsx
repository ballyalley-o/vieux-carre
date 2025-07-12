import { FC } from 'react'
import { Separatr } from 'component/shared/separatr'
import { transl } from 'lib'
import ProductCard from './product-card'

interface ProductListProps {
  data  : Product[]
  title?: string
  limit?: number
}
const ProductList: FC<ProductListProps> = ({ data, title, limit }) => {
  const limitedData = limit ? data.slice(0, limit) : data
  return (
    <div className={'my-10'}>
      <Separatr label={title} className={'h2-bold mb-4 text-mono pr-4'} wrapperClassName={'justify-start'} borderClassName={'border-black dark:border-white'} />
      {data.length > 0 ? (
        <div className={'flex justify-center'}>
          <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
            {limitedData.map((product: Product, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>{transl('error.product_not_found')}</h3>
        </div>
      )}
    </div>
  )
}

export default ProductList
