import { type ReactNode, type FC } from 'react'
import { mergeClassNames } from '@utils'

interface IPropsButtonContainedProps {
  children: ReactNode
  className?: string
}

export const ButtonContained: FC<IPropsButtonContainedProps> = ({
  children,
  className = '',
}) => {
  const defaultClassName = 'rounded-md bg-primary p-2 font-bold children-white'

  return (
    <button className={mergeClassNames([defaultClassName, className])}>
      {children}
    </button>
  )
}
