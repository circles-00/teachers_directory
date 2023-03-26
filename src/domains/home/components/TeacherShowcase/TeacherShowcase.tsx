import { type FC } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Teacher } from './components'
import Teacher1 from '@assets/teachers/portrait-1.png'
import Teacher2 from '@assets/teachers/portrait-2.png'
import Teacher3 from '@assets/teachers/portrait-3.png'
import Teacher4 from '@assets/teachers/portrait-4.png'

const teachers = [
  {
    image: Teacher1,
    name: 'Katherine Urman',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus eget lectus vitae venenatis. Nam porttitor blandit est sit amet mollis. Integer in ligula non erat efficitur lacinia.',
    rating: 4.9,
    ratingCount: 334,
    subjects: ['Social Studies', 'Arts', 'Drama'],
    position: 'Humanity Teacher',
    type: 'Full-Time',
    color: '#919EAB1F',
  },
  {
    image: Teacher2,
    name: 'Damian Phils',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus eget lectus vitae venenatis. Nam porttitor blandit est sit amet mollis. Integer in ligula non erat efficitur lacinia.',
    rating: 4.4,
    ratingCount: 212,
    subjects: ['Social Studies', 'Arts', 'Drama'],
    position: 'Math Teacher',
    type: 'Full-Time',
    color: '#919EAB1F',
  },
  {
    image: Teacher3,
    name: 'Damian Rotherhire',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus eget lectus vitae venenatis. Nam porttitor blandit est sit amet mollis. Integer in ligula non erat efficitur lacinia.',
    rating: 4.1,
    ratingCount: 324,
    subjects: ['Social Studies', 'Arts', 'Drama'],
    position: 'Humanity Teacher',
    type: 'Full-Time',
    color: '#919EAB1F',
  },
  {
    image: Teacher4,
    name: 'Anna Shultz',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus eget lectus vitae venenatis. Nam porttitor blandit est sit amet mollis. Integer in ligula non erat efficitur lacinia.',
    rating: 4.9,
    ratingCount: 334,
    subjects: ['Social Studies', 'Arts', 'Drama'],
    position: 'Humanity Teacher',
    type: 'Full-Time',
    color: '#919EAB1F',
  },
]

interface ITeacherShowcaseProps {}

export const TeacherShowcase: FC<ITeacherShowcaseProps> = () => {
  return (
    <div className="mx-auto flex w-4/5 flex-col py-24">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h6 className="text-sm font-bold text-primary">Find great work</h6>
          <h1 className="text-5xl font-bold">For Teachers</h1>
          <p className="text-base">
            Discover new exciting opportunities to work with and take your
            career to new heights.
          </p>
        </div>
        <div className="mt-6 mr-8 flex h-16 items-center gap-4 border-[1px] border-[#919EAB3D] px-4">
          <ChevronLeftIcon className="w-6 cursor-pointer text-[#637381]" />
          <ChevronRightIcon className="w-6 cursor-pointer text-[#637381]" />
        </div>
      </div>
      <div className="mx-auto mt-10 flex w-full flex-col justify-evenly gap-4 md:flex-row">
        {teachers.map((teacher, index) => (
          <Teacher key={index} {...teacher} />
        ))}
      </div>
    </div>
  )
}
