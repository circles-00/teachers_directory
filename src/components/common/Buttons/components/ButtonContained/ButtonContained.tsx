import { type ReactNode, type FC, type MouseEvent } from 'react'
import { mergeClassNames } from '@utils'

export interface ButtonContainedProps {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
  disabled?: boolean
}

export const ButtonContained: FC<ButtonContainedProps> = ({
  children,
  className = '',
  onClick,
  disabled,
}) => {
  const defaultClassName = `rounded-md ${
    disabled
      ? 'bg-[#919EAB3D] text-[#919EABCC] cursor-not-allowed'
      : 'bg-primary text-white cursor-pointer'
  } p-2 font-bold children-white`

  return (
    <button
      onClick={onClick}
      className={mergeClassNames([defaultClassName, className])}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
