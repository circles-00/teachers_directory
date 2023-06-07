import {
  Open_Sans,
  Playfair_Display,
  Inter,
  Public_Sans,
} from 'next/font/google'
import localFont from 'next/font/local'

export const playfairDisplay = Playfair_Display({ subsets: ['latin'] })
export const openSans = Open_Sans({ subsets: ['latin'] })
export const inter = Inter({ subsets: ['latin'] })

export const publicSans = Public_Sans({ subsets: ['latin'] })

export const graphik = localFont({
  src: [
    {
      path: '../../public/fonts/Graphik-Regular-Trial.otf',
      weight: 'normal',
    },
  ],
  variable: '--font-graphik',
})
