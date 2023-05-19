import { type AppProps } from 'next/app'
import { type NextPage } from 'next'
import { EScreenId } from "@domains/screen";

type PageType = 'PRIVATE' | 'PUBLIC'

// eslint-disable-next-line @typescript-eslint/ban-types
export type TeachersDirectoryPage<P = {}, IP = P> = NextPage<P, IP> & {
  pageType: PageType
  screenId: EScreenId
}

export type TeachersDirectoryAppProps = AppProps & {
  Component: TeachersDirectoryPage
}
