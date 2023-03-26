import Image from 'next/image'
import { type FC } from 'react'
import Image1 from '@assets/who-we-are/img-1.png'
import Image2 from '@assets/who-we-are/img-2.png'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

interface IWhoWeAreProps {}

const images = [Image1, Image2]

export const WhoWeAre: FC<IWhoWeAreProps> = () => {
  return (
    <div className="mx-auto flex flex-col justify-evenly px-4 py-20 md:flex-row md:px-0">
      <div className="flex items-end gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={'image'}
              width={image.width}
              height={image.height}
              className="rounded-2xl"
            />
          </div>
        ))}
      </div>
      <div className="mt-10 flex w-full flex-col gap-10 md:mt-0 md:w-2/6">
        <h1 className="text-5xl font-bold">Who We Are</h1>
        <p className="text-base text-[#637381]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          diam justo, lobortis sit amet nisi eu, vestibulum volutpat tellus.
          Morbi at dolor risus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aliquam sit amet varius sem. Fusce tempus metus vel
          ultrices cursus. Aliquam porta elit risus, id sollicitudin nulla
          condimentum in. Vestibulum et mauris augue. Quisque molestie magna
          venenatis lorem aliquam scelerisque. Donec vel nibh nulla.
        </p>
        <button className="flex w-40 justify-center rounded-md border-[1px] border-[#919EAB52] py-4 text-base font-bold">
          Learn more
          <ArrowLongRightIcon className="ml-2 w-6" />
        </button>
      </div>
    </div>
  )
}
