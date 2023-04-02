import { type FC } from 'react'
import { mergeClassNames } from '@utils'

interface IInputProps {
  placeholder: string
  className?: string
}

export const Input: FC<IInputProps> = ({ placeholder, className = '' }) => {
  const defaultClassName =
    'h-12 w-full rounded-md border-[1px] border-[#0000004D] p-2'

  return (
    <input
      placeholder={placeholder}
      className={mergeClassNames([defaultClassName, className])}
    />
  )
}
