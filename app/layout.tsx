import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Vieux Carré',
    default: 'Vieux Carré'
  },
  description: 'Old Square shop'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.className} antialiased`}>{children}</body>
    </html>
  )
}
