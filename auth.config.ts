/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth"
import { NextResponse } from "next/server"
import { PROTECTED_ROUTES } from 'config'

export const authConfig = {
    providers: [],
    callbacks: {
        authorized({ request, auth }: any) {
                const { pathname } = request.nextUrl
                if (!auth && PROTECTED_ROUTES.some((p) => p.test(pathname))) return false
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