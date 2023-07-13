import { type FC } from 'react'
import { ButtonContained } from '@components'
import { Service } from './Service'

interface ITeacherInformationProps {
  name: string
  location: string
  profileTitle: string
  about: string
  services: string[]
  isAvailable: boolean
  availabilityDate: string
  typeOfJob: string
}

export const TeacherInformation: FC<ITeacherInformationProps> = ({
  location,
  name,
  profileTitle,
  services,
  about,
  isAvailable,
  availabilityDate,
  typeOfJob,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 md:ml-4">
          <div className="mt-4 flex flex-col gap-3 md:mt-0 md:flex-row">
            <h3 className="text-xl font-bold">{name}</h3>
            <h3 className="text-xl font-bold text-primary">{profileTitle}</h3>
          </div>

          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-[#797995]">{location}</p>
            <p className="text-[#797995]">{typeOfJob}</p>
          </div>
        </div>

        <div className="mr-auto ml-auto mt-6 md:mr-0 md:mt-0">
          <ButtonContained className="h-14 px-10">Get in touch</ButtonContained>
          <h1 className="mt-2 text-center text-sm font-bold text-[#DF1642]">
            {isAvailable
              ? 'Available now'
              : `Available from: ${availabilityDate}`}
          </h1>
        </div>
      </div>
      <hr className="ml-4 mt-7 fill-[#D6DFE5]" />
      <p className="pl-4 text-sm font-bold">About me</p>
      <p className="mt-2 pl-4 text-sm md:pr-40">{about}</p>
      <p className="mt-10 pl-4 text-sm font-bold">Services I offer</p>
      <div className="mt-1 flex gap-2 pl-3  ">
        {services.map((service, index) => (
          <Service key={index} service={service} />
        ))}
      </div>
    </div>
  )
}
