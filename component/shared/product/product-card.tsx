import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader } from 'component/ui'
import { PATH_DIR } from 'config'

const ProductCard: FC<Product> = (product) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={PATH_DIR.MOCK_PRODUCT(product.slug)}>
          <Image src={product.images[0]} alt={product.name} height={300} />
        </Link>
      </CardHeader>
    </Card>
  )
}

export default ProductCard
