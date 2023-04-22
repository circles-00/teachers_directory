import { type FC } from 'react'
import { TrashIcon } from '@components'

interface ITrashButtonProps {
  onRemove: (index: number) => void
  index: number
  isDisabled: boolean
}

export const TrashButton: FC<ITrashButtonProps> = ({
  index,
  onRemove,
  isDisabled,
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={() => onRemove(index)}
      className={`w-full rounded-lg p-3 font-bold text-white md:w-fit md:rounded-none md:p-0 ${
        isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-danger'
      } md:bg-transparent`}
    >
      <div className="hidden md:block">
        <TrashIcon
          disabled={isDisabled}
          fillColor={isDisabled ? '' : 'fill-danger'}
        />
      </div>
      <p className="md:hidden">Delete</p>
    </button>
  )
}
