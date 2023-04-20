import { type FC } from 'react'

interface SchoolsFeatureProps {
  title: string
  description: string
}

export const SchoolsFeature: FC<SchoolsFeatureProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex h-48 flex-col justify-between whitespace-pre-wrap rounded-xl bg-primary px-6 pt-6 text-white md:w-96">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mb-10 font-medium">{description}</p>
    </div>
  )
}
