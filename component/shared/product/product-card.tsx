import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent } from 'component/ui'
import { PATH_DIR } from 'config'

const ProductCard: FC<Product> = (product) => {
  return (
    <Card className="w-full max-w-sm shadow-none" suppressHydrationWarning>
      <CardHeader className="p-0 items-center">
        <Link href={PATH_DIR.MOCK_PRODUCT(product.slug)}>
          <Image src={product.images[0]} alt={product.name} height={300} width={300} priority />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={PATH_DIR.MOCK_PRODUCT(product.slug)}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>
            {product.rating} {'Stars'}
          </p>
          {product.stock > 0 ? <p className="font-bold">{product.price}</p> : <p className="text-destructive">{'Out of Stock'}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
