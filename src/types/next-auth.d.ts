// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { type TUser } from '~/server/api/types'

type NextAuthUser = Omit<TUser, 'password'> & {
  profilePicture: string
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: NextAuthUser
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: NextAuthUser
  }
}
