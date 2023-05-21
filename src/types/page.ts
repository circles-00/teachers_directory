import { type AppProps } from 'next/app'
import { type NextPage } from 'next'
import { type Session } from 'next-auth'

// eslint-disable-next-line @typescript-eslint/ban-types
export type TeachersDirectoryPage<P = {}, IP = P> = NextPage<P, IP> & {
  // Add props page props definitions here
}

export type TeachersDirectoryAppProps = AppProps<{
  session: Session
}> & {
  Component: TeachersDirectoryPage
}

export const EScreensList = [
  {
    name: 'Home',
    path: '/',
    type: 'PUBLIC',
  },
  {
    name: 'Login',
    path: '/login',
    type: 'PUBLIC',
    redirect: '/',
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    type: 'PUBLIC',
    redirect: '/',
  },
  {
    name: 'Sign-Up',
    path: '/sign-up',
    type: 'PUBLIC',
    redirect: '/',
  },
  {
    name: 'Sign-Up Account Type',
    path: '/sign-up/account-type',
    type: 'PUBLIC',
    redirect: '/',
  },
  {
    name: 'Teacher Sign-Up',
    path: '/sign-up/teacher',
    type: 'PRIVATE',
    redirect: '/login',
  },
  {
    name: 'School Sign-Up',
    path: '/sign-up/school',
    type: 'PRIVATE',
    redirect: '/login',
  },
  {
    name: 'Search',
    path: '/search',
    type: 'PUBLIC',
  },
]
