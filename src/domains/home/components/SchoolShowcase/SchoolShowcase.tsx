import { type FC } from 'react'
import { SchoolTeacher } from './components'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import SchoolTeacher1 from '@assets/school-teachers/portrait-1.png'
import SchoolTeacher2 from '@assets/school-teachers/portrait-2.png'
import SchoolTeacher3 from '@assets/school-teachers/portrait-3.png'
import SchoolTeacher4 from '@assets/school-teachers/portrait-4.png'

interface SchoolShowcaseProps {}

const teachers = [
  {
    name: 'Jayvion Simon',
    role: 'Drama Teacher',
    image: SchoolTeacher1.src,
  },
  {
    name: 'Lucian Obrien',
    role: 'Primary Teacher',
    image: SchoolTeacher2.src,
  },
  {
    name: 'Deja Brady',
    role: 'German Teacher',
    image: SchoolTeacher3.src,
  },
  {
    name: 'Maria Rodriguez',
    role: 'Spanish Teacher',
    image: SchoolTeacher4.src,
  },
]

export const SchoolShowcase: FC<SchoolShowcaseProps> = () => {
  return (
    <div className="mt-[-45px] w-full bg-[#F7F8FC] pb-20">
      <div className="mx-auto flex w-2/5 flex-col items-center justify-center gap-4 pt-24">
        <h6 className="text-center text-xs font-bold text-primary">
          Find the best talent
        </h6>
        <h1 className="text-5xl font-bold text-colorText md:text-center">
          For Schools
        </h1>
        <p className="text-base text-colorText md:text-center">
          Work with the largest network of professionals and get things
          done—from quick turnarounds to big transformations.
        </p>
      </div>
      <div className="mx-auto mt-10 flex w-4/5 flex-col justify-evenly gap-4 md:flex-row md:gap-0">
        {teachers.map((teacher, index) => (
          <SchoolTeacher key={index} {...teacher} />
        ))}
      </div>
      <button className="mx-auto mt-16 flex rounded-lg border-[1px] border-primaryTransparent-48 p-4 text-base font-bold text-primary">
        Post a Job and Find the right Teacher
        <ArrowLongRightIcon className="ml-2 w-6" />
      </button>
    </div>
  )
}
