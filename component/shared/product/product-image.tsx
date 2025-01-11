'use client'
import { FC, useState } from 'react'
import Image from 'next/image'
import { cn } from 'lib'

interface ProductImageProps {
  images: string[]
}

const ProductImage: FC<ProductImageProps> = ({ images }) => {
  const [current, setCurrent] = useState(0)
  return (
    <div className="space-y-4">
      <Image src={images[current]} alt={'product-image'} width={1000} height={1000} className="min-h-[300px] object-cover object-center" priority />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn('border-b-4 mr-2 cursor-pointer hover:border-gray-700', current === index && 'border-gray-400')}>
            <Image src={image} alt={'product-image'} width={80} height={80} className={cn(current !== index && 'scale-75')} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImage
