import { ReactNode } from 'react'
import { getAllFeaturedProducts } from 'lib'
import { Header, Footer } from 'component/shared'
import { ProductCarousel } from 'component/shared/product'

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const featuredProducts = await getAllFeaturedProducts()
  return (
    <div className={'flex min-h-screen flex-col'}>
      <Header />
      {featuredProducts.length > 0 && (
        <div className="w-screen overflow-hidden">
          <ProductCarousel products={featuredProducts} />
        </div>
      )}
      <main className={'flex-1 wrapper'}>{children}</main>
      <Footer />
    </div>
  )
}
