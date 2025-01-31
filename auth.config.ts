/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth"
import { NextResponse } from "next/server"
import { PROTECTED_ROUTES } from 'config'
import { KEY } from 'lib/constant'

export const authConfig = {
    providers: [],
    callbacks: {
    authorized({ request, auth }: any) {
            const { pathname } = request.nextUrl
            if (!auth && PROTECTED_ROUTES.some((p) => p.test(pathname))) return false
            if (!request.cookies.get(KEY.SESSION_BAG_ID)) {
              const sessionBagId = crypto.randomUUID()
              const newRequestHeaders = new Headers(request.headers)
              const response = NextResponse.next({ request: { headers: newRequestHeaders } })
              response.cookies.set(KEY.SESSION_BAG_ID, sessionBagId)
              return response
            } else {
              return true
            }
        }
    }
} satisfies NextAuthConfig