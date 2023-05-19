import { type AppProps } from 'next/app'
import { type NextPage } from 'next'

type PageType = 'PRIVATE' | 'PUBLIC'

// eslint-disable-next-line @typescript-eslint/ban-types
export type TeachersDirectoryPage<P = {}, IP = P> = NextPage<P, IP> & {
  pageType: PageType
}

export type TeachersDirectoryAppProps = AppProps & {
  Component: TeachersDirectoryPage
}
