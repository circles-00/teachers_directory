import { type FC } from 'react'
import { mergeClassNames } from '@utils'
import { type ControllerRenderProps, type FieldValues } from 'react-hook-form'

export interface IInputProps {
  placeholder: string
  containerClassName?: string
  className?: string
  label?: string
  type?: 'text' | 'email' | 'password'
  labelClassName?: string
  field?: ControllerRenderProps<FieldValues, string>
  error?: string
}

export const Input: FC<IInputProps> = ({
  placeholder,
  className = '',
  label,
  type = 'text',
  labelClassName = '',
  containerClassName = '',
  field,
  error,
}) => {
  const defaultClassName =
    'h-12 rounded-md border-[1px] border-[#0000004D] p-2 focus:outline-gray-500 focus:outline-1'
  const labelDefaultClassName = 'pb-2'
  const defaultContainerClassName = 'flex w-full min-w-0 flex-col'

  return (
    <div
      className={mergeClassNames([
        defaultContainerClassName,
        containerClassName,
      ])}
    >
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
        {...field}
      />
      {!!error && <span className="mt-1 text-xs text-danger">{error}</span>}
    </div>
  )
}
