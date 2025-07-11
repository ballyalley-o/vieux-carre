'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Handshake } from 'lucide-react'
import { Card, CardHeader, CardContent, Badge } from 'component/ui'
import { PATH_DIR } from 'config'
import { transl } from 'lib'
import ProductPrice from './product-price'

const MotionImage = motion.create(Image)

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className={"w-full max-w-sm sm:max-w-screen-sm shadow-none"}>
      <CardHeader className={"p-0 items-center h-60 md:h-96 overflow-hidden"}>
        <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)} className={'relative'}>
          {product?.isDotm  && <Badge variant={'secondary'} className={'text-xs absolute top-5 left-5 z-30 gap-2'}><Handshake size={15} /><p>{transl('deal_of_the_month.label')}</p></Badge>}
          <MotionImage src={product.images[0]} alt={product.name} height={300} width={300} className={'object-cover object-center h-60 md:h-96 block'} priority whileHover={{ scale: 1.05 }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
        </Link>
      </CardHeader>
      <CardContent className={"p-4 grid gap-4"}>
         <div className={'flex items-center justify-start gap-2'}><p className={'text-xs'}>{product.brand}</p></div>
        <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)}>
          <h2 className={"text-xs md:text-lg font-medium h-10"}>{product.name}</h2>
        </Link>
        <div className={"flex justify-end gap-4x"}>
          {product.stock > 0 ? <ProductPrice value={Number(product.price)} /> : <p className={"text-destructive"}>{transl('out_of_stock.label')}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
