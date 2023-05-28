import { type FC } from 'react'
import { TrashIcon } from '@components'
import { mergeClassNames } from '@utils'

interface ITrashButtonProps {
  onRemove: (index: number) => void
  index: number
  isDisabled: boolean
  className?: string
}

export const TrashButton: FC<ITrashButtonProps> = ({
  index,
  onRemove,
  isDisabled,
  className = '',
}) => {
  const defaultClassName = `w-full rounded-lg p-3 font-bold text-white md:w-fit md:rounded-none md:p-0 ${
    isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-danger'
  } md:bg-transparent`

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onRemove(index)}
      className={mergeClassNames([defaultClassName, className])}
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
