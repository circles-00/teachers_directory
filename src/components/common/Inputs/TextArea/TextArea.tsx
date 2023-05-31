import { type FC, useRef } from 'react'
import { mergeClassNames } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'

export interface ITextAreaProps {
  placeholder: string
  containerClassName?: string
  className?: string
  label?: string
  labelClassName?: string
  error?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  value?: string
  maxLength?: number
}

export const TextArea: FC<ITextAreaProps> = ({
  error,
  onChange,
  onBlur,
  value,
  className = '',
  labelClassName = '',
  label,
  containerClassName = '',
  placeholder,
  maxLength = 150,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const defaultClassName =
    'overflow-hidden rounded-md border-[1px] border-[#0000004D] px-2 py-4 focus:outline-black focus:outline-1 placeholder:text-xs resize-none'
  const labelDefaultClassName = 'pb-2'
  const defaultContainerClassName = 'flex w-full min-w-0 flex-col'

  const initialTextAreaHeight = '48px'

  // resize textarea to fit content
  const resizeTextArea = () => {
    if (!textAreaRef.current) return

    if (value === '') {
      textAreaRef.current.style.height = initialTextAreaHeight
      return
    }

    textAreaRef.current.style.height = `${
      textAreaRef.current.scrollHeight - 7
    }px`
  }

  useUpdate(resizeTextArea, [value])

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
      <textarea
        ref={textAreaRef}
        maxLength={maxLength}
        rows={2}
        value={value}
        placeholder={placeholder}
        className={mergeClassNames([defaultClassName, className])}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={onBlur}
      />
      {!!error && <span className="mt-1 text-xs text-danger">{error}</span>}
    </div>
  )
}
