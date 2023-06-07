import { type FC } from 'react'
import { VerticalDotsMenu } from '@components'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { SingleSchool } from './SingleSchool'
import LondonUniversityLogo from '@assets/network-schools/lodon_university.png'
import GuindhallUniversityLogo from '@assets/network-schools/guildhall_university.png'
import BussinessSchoolLogo from '@assets/network-schools/business_school.png'

interface INetworkSchoolsProps {}

const schools = [
  {
    schoolName: 'University of London',
    schoolDescription: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
    date: '08 Dec 2022',
    image: LondonUniversityLogo.src,
  },
  {
    schoolName: 'London Guildhall University',
    schoolDescription: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
    date: '08 Dec 2022',
    image: GuindhallUniversityLogo.src,
  },
  {
    schoolName: 'Business School London ',
    schoolDescription: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
    date: '08 Dec 2022',
    image: BussinessSchoolLogo.src,
  },
]

const Divider = () => <hr className="mt-4 w-full fill-[#919EAB]" />

export const NetworkSchools: FC<INetworkSchoolsProps> = () => {
  return (
    <div className="flex h-fit flex-col rounded-xl border-2 border-gray-100 pt-7">
      <div className="flex items-center px-8">
        <h1 className="text-lg font-bold">Network Schools</h1>
        <button className="ml-auto">
          <VerticalDotsMenu />
        </button>
      </div>
      <Divider />
      {schools.map((school, index) => (
        <SingleSchool key={index} {...school} />
      ))}
      <Divider />
      <div className="py-5 pr-5">
        <button
          type="button"
          className="ml-auto flex items-center gap-1 text-sm font-bold"
        >
          View All <ChevronRightIcon className="h-4 w-4 stroke-2" />
        </button>
      </div>
    </div>
  )
}
