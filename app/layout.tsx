import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { GLOBAL } from 'vieux-carre'
import Script from 'next/script'
import { Inter_Tight } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster, TooltipProvider } from 'component/ui'
import { KEY } from 'lib'
import 'asset/style/global.css'

const interTight = Inter_Tight({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: `%s • ${GLOBAL.APP_NAME}`,
    default : GLOBAL.APP_NAME
  },
  description : GLOBAL.APP_DESCRIPTION,
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
        <Script src={GLOBAL.GOOGLE.MAPS_API_KEY} strategy="beforeInteractive" />
        <ThemeProvider attribute="class" defaultTheme={KEY.LIGHT} enableSystem disableTransitionOnChange>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
