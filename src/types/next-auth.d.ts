// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { type TUser } from '~/server/api/types'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Omit<TUser, 'password'>
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: Omit<TUser, 'password'>
  }
}
