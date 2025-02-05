import { FC } from 'react'
import ProductCard from './product-card'
import { en } from 'public/locale'

interface ProductListProps {
  data: Product[]
  title?: string
  limit?: number
}
const ProductList: FC<ProductListProps> = ({ data, title, limit }) => {
  const limitedData = limit ? data.slice(0, limit) : data

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {limitedData.map((product: Product, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>{en.error.product_not_found}</h3>
        </div>
      )}
    </div>
  )
}

export default ProductList
