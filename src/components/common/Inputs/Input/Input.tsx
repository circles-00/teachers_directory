import { type FC } from 'react'
import { mergeClassNames } from '@utils'

interface IInputProps {
  placeholder: string
  className?: string
  label?: string
  type?: 'text' | 'email' | 'password'
  labelClassName?: string
}

export const Input: FC<IInputProps> = ({
  placeholder,
  className = '',
  label,
  type = 'text',
  labelClassName = '',
}) => {
  const defaultClassName =
    'h-12 rounded-md border-[1px] border-[#0000004D] p-2 focus:outline-slate-400'
  const labelDefaultClassName = 'pb-2'

  return (
    <div className="flex w-full min-w-0 flex-col">
      {label && (
        <label
          className={mergeClassNames([labelDefaultClassName, labelClassName])}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={mergeClassNames([defaultClassName, className])}
      />
    </div>
  )
}
