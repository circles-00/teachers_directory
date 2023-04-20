import { type FC } from 'react'
import { SearchForm } from './components'
import { HeroBg } from '@components/svgs'
import { playfairDisplay } from '@utils'

interface IHeroContainerProps {}

export const HeroContainer: FC<IHeroContainerProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 w-3/5">
        <h1
          className={`text-5xl font-black md:text-center md:text-7xl ${playfairDisplay.className} text-black`}
        >
          The UK&apos;s First <br /> Teachers&apos; Directory.
        </h1>
        <p className="mt-8 text-xl md:text-center md:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          finibus eget lectus vitae venenatis. Nam porttitor blandit est sit
          amet mollis. Integer in ligula non erat efficitur lacinia.
        </p>
      </div>
      <SearchForm />
      <div className="mt-14 hidden w-full md:block">
        <HeroBg />
      </div>
    </div>
  )
}
