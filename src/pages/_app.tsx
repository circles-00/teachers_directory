import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { useCommonStore } from '@store'
import { inter } from '@utils'

const TeachersDirectory: AppType = ({ Component, pageProps }) => {
  const { isMobileDrawerOpen } = useCommonStore()

  return (
    <>
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
    </>
  )
}

export default api.withTRPC(TeachersDirectory)
