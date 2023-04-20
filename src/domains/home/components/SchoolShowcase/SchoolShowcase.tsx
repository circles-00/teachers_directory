import { type FC } from 'react'
import { playfairDisplay } from '@utils'
import { SchoolsFeature } from './components'

const features = [
  {
    title: 'Post a teaching or\nrelated jobs',
    description: 'Qualified teachers.',
  },
  {
    title: 'Browse and find\nteachers.',
    description: 'By subject or location',
  },
  {
    title: 'Life after teaching',
    description: 'Teachers offering other services',
  },
]

interface SchoolShowcaseProps {}

export const SchoolShowcase: FC<SchoolShowcaseProps> = () => {
  return (
    <div className="mt-28 h-full bg-[url('/schools_showcase_bg.png')] bg-cover bg-center bg-no-repeat px-8 py-20 text-white md:px-[21.5rem]">
      <h3 className="text-3xl font-bold">For Schools</h3>
      <h1
        className={`leading-tight ${playfairDisplay.className} mt-2 text-5xl font-bold`}
      >
        Find teachers <br /> your way
      </h1>
      <p className="mt-12 w-full text-2xl font-bold md:w-2/6">
        Search the largest network of teachers – for anything from teaching, to
        delivering CPDS or creating resources. Anything.
      </p>
      <div className="mt-20 flex w-full flex-col gap-6 md:flex-row">
        {features.map((feature, index) => (
          <SchoolsFeature {...feature} key={index} />
        ))}
      </div>
    </div>
  )
}
