import { type FC } from 'react'
import Image from 'next/image'

interface ISingleSchoolProps {
  image: string
  schoolName: string
  schoolDescription: string
  date: string
}

export const SingleSchool: FC<ISingleSchoolProps> = ({
  schoolName,
  schoolDescription,
  date,
  image,
}) => {
  return (
    <div className="flex items-center gap-7 py-5 px-2 md:px-7 md:py-7">
      <div className="relative h-20 w-20 md:h-16 md:w-16">
        <Image
          src={image}
          alt={'Profile picture'}
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className="font-bold">{schoolName}</p>
        <p className="text-sm text-[#637381]">{schoolDescription}</p>
      </div>
      <p className="ml-auto text-sm text-[#637381]">{date}</p>
    </div>
  )
}
