import { type FC } from 'react'
import { CheckIcon } from '@components'

interface IBenefitProps {
  title: string
  description: string
}

export const Benefit: FC<IBenefitProps> = ({ title, description }) => {
  return (
    <div className="flex gap-2">
      <CheckIcon />
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="w-4/5 text-sm">{description}</p>
      </div>
    </div>
  )
}
