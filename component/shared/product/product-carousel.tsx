"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from 'component/ui'
import { PATH_DIR } from 'config'

const MotionImage = motion(Image)

interface ProductCarouselProps {
    products: Product[]
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const pathname = usePathname()

  const autoplayConfig = { delay: 10000, stopOnInteraction: true, stopOnMouseEnter: true }
  const carouselConfig = { loop: true }

  if (pathname !== '/') return null
  return (
    <Carousel className={'w-full mb-12'} opts={carouselConfig} plugins={[Autoplay(autoplayConfig)]}>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index}>
            <Link href={PATH_DIR.PRODUCT_VIEW(product.slug)}>
              <div className="relative mx-auto">
                <MotionImage src={product.banner!} alt={product.name} height={0} width={0} sizes={'100vw'} className={'w-full h-auto block'} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ProductCarousel
