import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { inter } from '@utils'
import { SessionProvider } from 'next-auth/react'
import { useIsMobileDrawerOpen } from '@hooks'
import { type TeachersDirectoryAppProps } from '~/types/page'
import { AppLayout } from '@layout'

const TeachersDirectory = ({
  Component,
  pageProps,
}: TeachersDirectoryAppProps) => {
  const isMobileDrawerOpen = useIsMobileDrawerOpen()

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
      <AppLayout Component={Component}>
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
      </AppLayout>
    </SessionProvider>
  )
}

export default api.withTRPC(TeachersDirectory)
