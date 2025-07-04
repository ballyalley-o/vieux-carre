import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const protectedPaths  = [/\/shipping/, /\/payment/, /\/place-order/, /\/account/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin\/(.*)/]
  const pathname        = request.nextUrl.pathname
  const isProtected     = protectedPaths.some((p) => p.test(pathname))
  const cookiesObject   = request.cookies
  const sessionCookie   = cookiesObject.get(process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token')
  const isAuthenticated = !!sessionCookie
  const isOnSignInPage  = pathname === '/sign-in'

  if (isProtected && !isAuthenticated  && !isOnSignInPage) {
    const signInUrl        = new URL('/sign-in', request.url)
    const existingCallback = request.nextUrl.searchParams.get('callbackUrl')
    signInUrl.searchParams.set('callbackUrl', existingCallback ?? request.nextUrl.href)
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
