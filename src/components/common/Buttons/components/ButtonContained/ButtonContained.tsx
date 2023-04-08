import { type ReactNode, type FC, type MouseEvent } from 'react'
import { mergeClassNames } from '@utils'

interface IPropsButtonContainedProps {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export const ButtonContained: FC<IPropsButtonContainedProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const defaultClassName = 'rounded-md bg-primary p-2 font-bold children-white'

  return (
    <button
      onClick={onClick}
      className={mergeClassNames([defaultClassName, className])}
    >
      {children}
    </button>
  )
}
