'use client'

import { FC } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'component/ui'
import { PATH_DIR } from 'config'

interface ProductCarouselProps {
    products: Product[]
}

const ProductCarousel: FC<ProductCarouselProps> = ({ products }) => {
  const autoplayConfig = { delay: 10000, stopOnInteraction: true, stopOnMouseEnter: true }
  const carouselConfig = { loop: true }

  return (
  <Carousel className={'w-full mb-12'} opts={carouselConfig} plugins={[Autoplay(autoplayConfig)]}>
    <CarouselContent>
        {products.map((product, index) => (
           <CarouselItem key={index}>
                <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)}>
                    <div className="relative mx-auto">
                        <Image src={product.banner!} alt={product.name} height={0} width={0} sizes={'100vw'} className={'w-full h-auto'}/>
                    </div>
                </Link>
           </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious className={'border-none rounded-sm shadow-none'} />
    <CarouselNext className={'border-none rounded-sm shadow-none'} />
  </Carousel>
  )
}

export default ProductCarousel
