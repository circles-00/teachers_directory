import { type FC } from 'react'
import { ButtonContained } from '@components'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'

interface ISaveButtonProps {
  onClick: () => void
}

export const SaveButton: FC<ISaveButtonProps> = ({ onClick }) => {
  return (
    <ButtonContained
      onClick={onClick}
      className="ml-auto mt-4 flex w-52 items-center justify-center py-3 pl-3 text-white"
    >
      Save and continue
      <ArrowLongRightIcon className="ml-1 h-6 w-6" />
    </ButtonContained>
  )
}
