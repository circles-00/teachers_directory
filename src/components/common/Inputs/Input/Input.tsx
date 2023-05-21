import { mergeClassNames } from '@utils'
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form'

export interface IInputProps<T> {
  placeholder: string
  containerClassName?: string
  className?: string
  label?: string
  type?: 'text' | 'email' | 'password'
  labelClassName?: string
  field?: ControllerRenderProps<FieldValues, Path<T>>
  error?: string
}

export const Input = <T,>({
  placeholder,
  className = '',
  label,
  type = 'text',
  labelClassName = '',
  containerClassName = '',
  field,
  error,
}: IInputProps<T>) => {
  const defaultClassName =
    'h-12 rounded-md border-[1px] border-[#0000004D] p-2 focus:outline-black focus:outline-1 placeholder:text-xs placeholder:-translate-y-0.5'
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
