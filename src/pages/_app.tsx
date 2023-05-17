import { type AppProps } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { inter } from '@utils'
import { SessionProvider } from 'next-auth/react'
import { useIsMobileDrawerOpen } from '@hooks'
import { useUser } from '~/hooks/useAuth'
import { type FC, type ReactElement } from 'react'

const AppLayout: FC<{ children: ReactElement[] }> = ({ children }) => {
  const user = useUser()

  // NOTE: we need to show a progress indicator to user while we are loading his session
  if (user.status === 'loading') {
    return null
  }

  return <>{children}</>
}

const TeachersDirectory = ({ Component, pageProps }: AppProps) => {
  const isMobileDrawerOpen = useIsMobileDrawerOpen()

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
      <AppLayout>
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
