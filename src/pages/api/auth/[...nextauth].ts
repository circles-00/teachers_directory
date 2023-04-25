import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

type Credentials = {
  username: string
  password: string
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { username, password } = credentials as Credentials

        if (username === 'admin' && password === 'adminadmin')
          return { id: '1', name: 'John Doe', email: '' }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: ({ user, account, profile }) => {
      console.log('signIn', user, account, profile)

      return true
    },
  },
  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
