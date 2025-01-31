/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import { cookies } from 'next/headers'
import { prisma } from 'db/prisma'
import { KEY } from 'lib/constant'
import { authConfig } from './auth.config'

export type SessionStrategyType = 'jwt' | 'database' | undefined

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in'
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (credentials === null) return null
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string
          }
        })
        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password)
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub
      session.user.role = token.role
      session.user.name = token.name
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },

    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]
          await prisma.user.update({ where: { id: user.id }, data: { name: token.name } })
        }
        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies()
          const sessionBagId = cookiesObject.get(KEY.SESSION_BAG_ID)?.value
          if (sessionBagId) {
            const sessionBag = await prisma.bag.findFirst({ where: { sessionBagId } })
            if (sessionBag) {
              await prisma.bag.deleteMany({where:{userId: user.id}})
              await prisma.bag.update({where: {id: sessionBag.id}, data: {userId: user.id}})
            }
          }
        }
      }
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
