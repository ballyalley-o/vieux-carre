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
      <div className={'h-[480px] relative overflow-hidden'}>
        <Image src={images[current]} alt={'product-image'} width={1000} height={1000} className="min-h-[300px] object-cover object-center" priority />
      </div>
      <div className="flex">
        {images.map((image, index) => (
          <div key={index} onClick={() => setCurrent(index)} className={cn('w-[80px] h-[80px] overflow-hidden mr-2 cursor-pointer')}>
            <Image
              src={image}
              alt={'product-image'}
              width={80}
              height={80}
              className={cn(
                current !== index ? 'border-t-4 hover:border-gray-700 scale-75 ease-in-out transition': 'border-gray-400 opacity-30'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImage
