import { type FC } from 'react'
import { ButtonContained } from '@components'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { mergeClassNames } from '@utils'

interface ISaveButtonProps {
  onClick?: () => void
  disabled?: boolean
  position?: 'left' | 'right'
  label?: string
  className?: string
}

export const SaveButton: FC<ISaveButtonProps> = ({
  onClick,
  disabled,
  position = 'right',
  label = 'Save and continue',
  className = '',
}) => {
  const defaultClassName = `${
    position === 'right' ? 'md:ml-auto' : 'md:mr-auto'
  } mt-4 flex w-52 items-center justify-center mr-auto md:mr-0 py-3 pl-3`

  return (
    <ButtonContained
      onClick={onClick}
      className={mergeClassNames([defaultClassName, className])}
      disabled={disabled}
    >
      {label}
      <ArrowLongRightIcon className="ml-1 h-6 w-6" />
    </ButtonContained>
  )
}
