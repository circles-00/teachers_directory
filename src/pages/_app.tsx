import { api } from '~/utils/api'

import '~/styles/globals.css'
import Head from 'next/head'
import { BackToTop, Footer, MobileDrawer, Navigation } from '@components/common'
import { inter } from '@utils'
import { SessionProvider } from 'next-auth/react'
import { useIsMobileDrawerOpen, useIsomorphicLayoutEffect } from "@hooks";
import { type TeachersDirectoryAppProps } from '~/types/page'
import { AppLayout } from '@layout'
import { useCurrentScreenId, usePagesActions } from "~/hooks/useStore/helperHooks/usePagesStore";

const TeachersDirectory = ({
  Component,
  pageProps,
}: TeachersDirectoryAppProps) => {
  const isMobileDrawerOpen = useIsMobileDrawerOpen()
  const currentScreenId = useCurrentScreenId()


  const {setCurrentScreenId} = usePagesActions()


  useIsomorphicLayoutEffect(() => {
    if(Component.screenId === currentScreenId) {
      setCurrentScreenId(Component.screenId)
    }
  })

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
