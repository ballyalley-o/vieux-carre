import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  export interface Session {
    user: {
      role     : string
      provider : 'credentials' | 'google' | undefined
      address ?: UserShippingAddress
    } & DefaultSession['user']
  }
}
