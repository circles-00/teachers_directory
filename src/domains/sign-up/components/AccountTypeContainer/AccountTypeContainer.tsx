import { type FC } from 'react'
import { ArrowBaloonRight, RoundedContainer } from '@components'

interface IAccountTypeContainerProps {
  title: string
  description: string
}

export const AccountTypeContainer: FC<IAccountTypeContainerProps> = ({
  title,
  description,
}) => {
  return (
    <RoundedContainer className="mt-4 w-full py-6 px-8 md:w-[500px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="mt-4">
            <h3 className="font-bold text-primary">Requires</h3>
            <p className="w-42 whitespace-pre-wrap text-[#637381]">
              {description}
            </p>
          </div>
        </div>
        <button className="flex h-12 w-16 items-center justify-center rounded-md bg-primary">
          <ArrowBaloonRight />
        </button>
      </div>
    </RoundedContainer>
  )
}
