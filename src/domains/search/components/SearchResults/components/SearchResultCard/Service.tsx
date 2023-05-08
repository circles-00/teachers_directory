import { type FC } from 'react'

interface IOfferedSubjectProps {
  service: string
}

export const Service: FC<IOfferedSubjectProps> = ({ service }) => {
  return (
    <p className="rounded-lg bg-[#00AB5514] py-1 px-2 text-sm">{service}</p>
  )
}
