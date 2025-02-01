/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth"
import { NextResponse } from "next/server"

export const authConfig = {
    providers: [],
    callbacks: {
        authorized({ request, auth }: any) {
                const protectedPaths = [
                  /\/shipping/,
                  /\/payment/,
                  /\/place-order/,
                  /\/account/,
                  /\/user\/(.*)/,
                  /\/order\/(.*)/,
                  /\/admin/,
                ];
                const { pathname } = request.nextUrl
                if (!auth && protectedPaths.some((p) => p.test(pathname))) return false
                if (!request.cookies.get('sessionBagId')) {
                  const sessionBagId = crypto.randomUUID()
                  const newRequestHeaders = new Headers(request.headers)
                  const response = NextResponse.next({ request: { headers: newRequestHeaders } })
                  response.cookies.set('sessionBagId', sessionBagId)
                  return response
                }
                return true
            }
    }
} satisfies NextAuthConfig