import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Inter_Tight } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "app/api/uploadthing/core"
import { Toaster, TooltipProvider } from 'component/ui'
import { KEY } from 'lib'
import { GLOBAL } from 'config'
import 'asset/style/global.css'

const interTight = Inter_Tight({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: `%s • ${GLOBAL.APP_NAME}`,
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
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
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
