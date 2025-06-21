import NextAuth from 'next-auth'
import { authConfig } from 'vieux-carre.authenticate'

export const { auth: middleware } = NextAuth(authConfig)
