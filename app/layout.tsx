import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Inter_Tight } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'component/ui'
import { KEY } from 'lib'
import { GLOBAL } from 'config'
import 'asset/style/global.css'

const interTight = Inter_Tight({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${GLOBAL.APP_NAME}`,
    default: GLOBAL.APP_NAME
  },
  description: GLOBAL.APP_DESCRIPTION,
  metadataBase: new URL(GLOBAL.SERVER_URL)
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={KEY.EN} suppressHydrationWarning>
      <body className={`${interTight.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme={KEY.LIGHT} enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
