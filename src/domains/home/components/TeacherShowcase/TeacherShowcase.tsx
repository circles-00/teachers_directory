import { type FC } from 'react'
import Image from 'next/image'
import { playfairDisplay } from '@utils'
import TeachersShowcaseBg from '@assets/teachers_showcase_bg.png'
import { Benefit } from './components'

const benefits = [
  {
    title: 'Proof of quality',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque diam justo, lobortis sit amet nisi eu, vestibulum volutpat tellus. ',
  },
  {
    title: 'No cost until you hire',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque diam justo, lobortis sit amet nisi eu, vestibulum volutpat tellus. ',
  },
  {
    title: 'No cost until you hire',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque diam justo, lobortis sit amet nisi eu, vestibulum volutpat tellus. ',
  },
]

interface ITeacherShowcaseProps {}

export const TeacherShowcase: FC<ITeacherShowcaseProps> = () => {
  return (
    <div className="mt-10 flex flex-col justify-center md:mt-20 md:flex-row">
      <div className="w-full bg-[#f0f8f2] pl-6 pt-6 md:w-1/3">
        <h3 className="text-[32px] font-bold">For teachers</h3>
        <h1
          className={`${playfairDisplay.className} mt-1 text-5xl font-extrabold leading-tight text-primary`}
        >
          Let the world find you. <br /> New opportunities.
        </h1>
        <div className="mt-10 mb-8 flex flex-col gap-10 md:mb-0">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} />
          ))}
        </div>
      </div>
      <div>
        <Image
          src={TeachersShowcaseBg.src}
          width={TeachersShowcaseBg.width}
          height={TeachersShowcaseBg.height}
          alt="Teachers Showcase"
        />
      </div>
    </div>
  )
}
