import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { KEY } from 'lib'
import { GLOBAL } from 'config'

const interTight = Inter_Tight({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${GLOBAL.appName}`,
    default: GLOBAL.appName
  },
  description: 'Old Square shop'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={KEY.EN}>
      <body className={`${interTight.className} antialiased`}>{children}</body>
    </html>
  )
}
