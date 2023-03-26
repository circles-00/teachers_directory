import { type FC } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

interface ITeacherProps {
  image: StaticImageData
  name: string
  description: string
  rating: number
  ratingCount: number
  subjects: string[]
  position: string
  type: string
  color: string
}

export const Teacher: FC<ITeacherProps> = ({
  image,
  name,
  description,
  rating,
  ratingCount,
  subjects,
  position,
  type,
  color,
}) => {
  return (
    <div>
      <div
        className={`flex w-[90%] flex-col items-center rounded-t-2xl bg-[${color}] py-4`}
      >
        <Image
          className="rounded-full"
          src={image.src}
          alt={name}
          width={image.width}
          height={image.height}
        />
        <h1 className="mt-4 text-center text-base font-bold">{name}</h1>
        <p className="mx-auto mt-2 w-4/5 text-sm text-[#212B36CC]">
          {description}
        </p>
      </div>

      <div className="flex w-[90%] flex-col rounded-b-2xl border-[1px] border-[#919EAB33] py-4 px-6">
        <div className="flex items-center">
          <StarIcon className="ml-2 mr-1 h-4 w-4 text-[#EFB352]" />
          <p className="text-sm font-bold">
            {rating}{' '}
            <span className="font-normal text-[#919EAB]">({ratingCount})</span>
          </p>
        </div>
        <div className="mt-4 flex flex-row gap-2 px-2 text-xs">
          {subjects.map((subject, index) => (
            <p
              key={index}
              className="rounded-md bg-[#919EAB26] px-2 py-1 text-[#8E9BAF]"
            >
              {subject}
            </p>
          ))}
          <p className="rounded-md border-[1px] border-[#919EAB52] p-1 text-[#8E9BAF]">
            ...
          </p>
        </div>
        <div className="mt-4 flex flex-row justify-between px-2">
          <p className="text-base font-bold text-primary">{position}</p>
          <p className="text-base font-bold">{type}</p>
        </div>
      </div>
    </div>
  )
}
