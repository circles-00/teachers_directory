import { type TLoginForm } from '@domains/auth'
import { signIn } from 'next-auth/react'

export const signInWithCredentials = async (credentials: TLoginForm) =>
  signIn('credentials', { ...credentials, redirect: false })
