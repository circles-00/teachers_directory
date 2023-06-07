import {
  type ForwardRefExoticComponent,
  type FC,
  type SVGProps,
  type ChangeEvent,
} from 'react'
import { mergeClassNames } from '@utils'

interface IIconInputProps {
  Icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
  className?: string
  iconClassName?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  iconPosition?: 'left' | 'right'
}

export const IconInput: FC<IIconInputProps> = ({
  Icon,
  placeholder,
  className = '',
  iconClassName = '',
  onChange,
  value,
  iconPosition = 'right',
}) => {
  const defaultInputClassName =
    'w-full h-12 rounded-md border-[1px] border-[#0000004D]'

  const defaultIconClassName = `pointer-events-none absolute top-0 ${
    iconPosition === 'right' ? 'right-0' : 'left-0'
  }`

  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={mergeClassNames([defaultInputClassName, className])}
      />
      <Icon
        className={mergeClassNames([defaultIconClassName, iconClassName])}
        width={24}
        height={24}
      />
    </div>
  )
}
