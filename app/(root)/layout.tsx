import { ReactNode } from 'react'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 wrapper">{children}</main>
    </div>
  )
}
