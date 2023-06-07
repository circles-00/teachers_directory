import { type FC } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'

interface ISingleContactProps {
  name: string
  email: string
}

export const SingleContact: FC<ISingleContactProps> = ({ name, email }) => {
  return (
    <div className="flex items-center gap-4 py-4 px-7">
      <div className="h-10 w-10 rounded-full bg-[#C4C4C4]" />
      <div className="flex flex-col">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm text-[#637381]">{email}</p>
      </div>
      <button className="ml-auto" type="button">
        <ArrowUpRightIcon className="h-5 w-5 fill-[#637381]" />
      </button>
    </div>
  )
}
