import { type FC } from 'react'
import Image from 'next/image'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@components/svgs'
import Link from 'next/link'
import { SocialIcons } from '../../../../../../components'

interface ISchoolTeacherProps {
  name: string
  role: string
  image: string
}

export const SchoolTeacher: FC<ISchoolTeacherProps> = ({
  name,
  role,
  image,
}) => {
  return (
    <div className="flex flex-col rounded-2xl bg-white px-2 py-4 text-colorText">
      <h1 className="text-center text-base font-bold">{name}</h1>
      <h3 className="text-center text-sm text-[#637381]">{role}</h3>
      <Image
        src={image}
        className="mx-auto mt-4 rounded-2xl"
        alt={name}
        width={254}
        height={262}
      />
      <SocialIcons className="mx-auto mt-4 flex" />
    </div>
  )
}
