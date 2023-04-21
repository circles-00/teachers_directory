import { type FC } from 'react'
import { ButtonContained } from '@components'

interface ISaveButtonProps {
  onClick: () => void
}

export const SaveButton: FC<ISaveButtonProps> = ({ onClick }) => {
  return (
    <ButtonContained
      onClick={onClick}
      className="ml-auto mt-4 w-52 py-3 text-white"
    >
      Save and continue
    </ButtonContained>
  )
}
