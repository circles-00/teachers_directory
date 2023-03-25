import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { Public_Sans } from 'next/font/google'
const publicSans = Public_Sans({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={publicSans.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default api.withTRPC(MyApp)
