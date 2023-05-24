import { type FC } from 'react'
import { ButtonContained, type ButtonContainedProps } from '../ButtonContained'
import { CircularLoadingSpinner } from '../../../CircularLoadingSpinner'
import { mergeClassNames } from '@utils'

interface IButtonWithLoadingProps extends ButtonContainedProps {
  isLoading: boolean
}

export const ButtonWithLoading: FC<IButtonWithLoadingProps> = ({
  isLoading,
  onClick,
  disabled,
  className = '',
  children,
}) => {
  const defaultClassName = `flex items-center justify-center py-4 text-white ${
    isLoading ? 'pointer-events-none cursor-not-allowed' : ''
  }`

  return (
    <ButtonContained
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={mergeClassNames([defaultClassName, className])}
    >
      {isLoading && <CircularLoadingSpinner />}
      {isLoading && 'Processing...'}
      {!isLoading && children}
    </ButtonContained>
  )
}
