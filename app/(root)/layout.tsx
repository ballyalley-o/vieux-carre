import { ReactNode } from 'react'
import { Header, Footer } from 'component/shared'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  )
}
