import { type ReactNode, type FC } from 'react'
import { mergeClassNames } from '@utils'

interface IRoundedContainerProps {
  children: ReactNode
  className?: string
}

export const RoundedContainer: FC<IRoundedContainerProps> = ({
  children,
  className = '',
}) => {
  const defaultClassName =
    'flex flex-col rounded-xl border-2 border-gray-100 shadow-sm md:mx-auto md:w-3/12'
  return (
    <div className={mergeClassNames([defaultClassName, className])}>
      {children}
    </div>
  )
}
