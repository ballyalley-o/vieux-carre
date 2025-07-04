import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectedPaths  = [/\/shipping/, /\/payment/, /\/place-order/, /\/account/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin\/(.*)/]
  const pathname        = request.nextUrl.pathname
  const isProtected     = protectedPaths.some((p) => p.test(pathname))
  const cookiesObject   = request.cookies
  const sessionCookie   = cookiesObject.get(process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token')
  const isAuthenticated = !!sessionCookie

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL('/sign-in', request.url)
    // signInUrl.searchParams.set('callbackUrl', request.url)
    if (!request.nextUrl.searchParams.has('callbackUrl')) {
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.href)
    }
    return NextResponse.redirect(signInUrl)
  }

  if (!cookiesObject.get('sessionBagId')) {
    const sessionBagId      = crypto.randomUUID()
    const newRequestHeaders = new Headers(request.headers)
    const response          = NextResponse.next({ request: { headers: newRequestHeaders } })
    response.cookies.set('sessionBagId', sessionBagId)
    return response
  }

  return NextResponse.next()
}
