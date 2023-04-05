import { Open_Sans, Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

const graphik = localFont({
  src: [
    {
      path: '../../public/fonts/Graphik-Regular-Trial.otf',
      weight: 'normal',
    },
  ],
  variable: '--font-graphik',
})

export { playfairDisplay, openSans, graphik, inter }
