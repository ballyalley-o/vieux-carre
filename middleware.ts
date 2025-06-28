import { auth } from 'vieux-carre.authenticate'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectedPaths  = [/\/shipping/, /\/payment/, /\/place-order/, /\/account/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin\/(.*)/]
  const pathname        = request.nextUrl.pathname
  const isProtected     = protectedPaths.some((p) => p.test(pathname))
  const session         = await auth()
  const isAuthenticated = !!session?.user

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  if (!request.cookies.get('sessionBagId')) {
    const sessionBagId = crypto.randomUUID()
    const newRequestHeaders = new Headers(request.headers)
    const response = NextResponse.next({ request: { headers: newRequestHeaders } })
    response.cookies.set('sessionBagId', sessionBagId)
    return response
  }

  return NextResponse.next()
}
