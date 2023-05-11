import { type FC } from 'react'
import { SearchForm } from './components'
import { playfairDisplay } from '@utils'
import { heroSliderData } from '@domains/home/components/HeroContainer/data'
import Image from 'next/image'

interface IHeroContainerProps {}

const HeroInfiniteSlider: FC<{
  direction: 'left' | 'right'
  images: (typeof heroSliderData)['first']
}> = ({ direction, images }) => {
  return (
    <div className="flex h-fit w-full items-center justify-center">
      {/* 1. */}
      <div className="relative h-52 w-[200%] overflow-hidden">
        {/* 2. */}
        <div
          className={`absolute ${
            direction === 'right'
              ? 'animate-right right-0'
              : 'animate-left left-0'
          } flex h-52 w-[200%] items-center justify-around`}
        >
          {/* 3 */}
          {images.map(({ image }, i) => {
            return (
              <div
                key={i}
                className="flex w-[20rem] items-start justify-center"
              >
                <Image
                  width={image.width}
                  height={image.height + 100}
                  src={image.src}
                  alt={'image'}
                />
              </div>
            )
          })}
          {images.map(({ image }, i) => {
            return (
              <div
                key={i}
                className="flex w-[20rem] items-start justify-center"
              >
                <Image
                  width={image.width}
                  height={image.height + 100}
                  src={image.src}
                  alt={'image'}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const HeroContainer: FC<IHeroContainerProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 w-3/5">
        <h1
          className={`text-5xl font-black md:text-center md:text-7xl ${playfairDisplay.className} text-black`}
        >
          The UK&apos;s First <br /> Teachers&apos; Directory.
        </h1>
        <p className="mt-8 text-xl md:text-center md:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          finibus eget lectus vitae venenatis. Nam porttitor blandit est sit
          amet mollis. Integer in ligula non erat efficitur lacinia.
        </p>
      </div>
      <SearchForm />
      <div className="mt-14 flex w-full flex-col gap-4">
        <HeroInfiniteSlider images={heroSliderData.first} direction="left" />
        <HeroInfiniteSlider images={heroSliderData.second} direction="right" />
      </div>
    </div>
  )
}
