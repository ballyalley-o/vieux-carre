import { ReactNode } from 'react'
import { getAllFeaturedProducts } from 'lib'
import { Header, Footer } from 'component/shared'

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const featuredProducts = await getAllFeaturedProducts()
  return (
    <div className={'flex h-screen flex-col'}>
      <Header products={featuredProducts} />
      <main className={'flex-1 wrapper'}>{children}</main>
      <Footer />
    </div>
  )
}
