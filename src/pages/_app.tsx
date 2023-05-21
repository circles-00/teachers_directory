import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { inter } from '@utils'
import { SessionProvider } from 'next-auth/react'
import { useIsMobileDrawerOpen } from '@hooks'
import { type TeachersDirectoryAppProps } from '~/types/page'
const TeachersDirectory = ({
  Component,
  pageProps: { session, ...pageProps },
}: TeachersDirectoryAppProps) => {
  const isMobileDrawerOpen = useIsMobileDrawerOpen()

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Teachers Directory</title>
        <meta name="description" content="Teachers Directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${inter.className} flex w-full justify-center overflow-hidden`}
      >
        <div className="w-full">
          <Navigation />
          {isMobileDrawerOpen && <MobileDrawer />}
          <div className={isMobileDrawerOpen ? 'hidden' : 'block'}>
            <Component {...pageProps} />
          </div>
          {!isMobileDrawerOpen && <Footer />}
          <BackToTop />
        </div>
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(TeachersDirectory)
