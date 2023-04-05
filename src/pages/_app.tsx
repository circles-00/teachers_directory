import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { useCommonStore } from '../store'
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
      <div className={inter.className}>
        <Navigation />
        {isMobileDrawerOpen && <MobileDrawer />}
        {!isMobileDrawerOpen && <Component {...pageProps} />}
        {!isMobileDrawerOpen && <Footer />}
        <BackToTop />
      </div>
    </>
  )
}

export default api.withTRPC(TeachersDirectory)
