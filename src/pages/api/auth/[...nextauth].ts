import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { AuthService } from '~/server/api/logic/auth'
import { excludeKeysFromObject } from '@utils'
import { type TUser } from '~/server/api/types'
import { type NextAuthUser } from '~/types/next-auth'

type TCredentials = {
  username: string
  password: string
  crfToken: string
  callbackUrl: string
  redirect: boolean
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials) {
        const { username: email, password } = credentials as TCredentials

        return AuthService.login({ email, password })
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: () => {
      return true
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    session: async ({ session }) => {
      const userFromDb = await AuthService.findUserByEmail(
        String(session.user?.email)
      )

      return {
        ...session,
        user: excludeKeysFromObject<TUser, keyof TUser>(
          userFromDb ?? ({} as TUser),
          ['password', 'verificationCode', 'verificationCodeExpiresAt']
        ),
      }
    },

    jwt: ({ token, user }) => {
      if (user) {
        token.user = user as NextAuthUser
      }

      return token
    },
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
