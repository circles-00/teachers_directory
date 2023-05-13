import { type AppProps } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { useCommonStore } from '@store'
import { inter } from '@utils'
import { SessionProvider } from 'next-auth/react'

const TeachersDirectory = ({ Component, pageProps }: AppProps) => {
  const { isMobileDrawerOpen } = useCommonStore()

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
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
