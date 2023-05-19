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
}

export const IconInput: FC<IIconInputProps> = ({
  Icon,
  placeholder,
  className = '',
  iconClassName = '',
  onChange,
  value,
}) => {
  const defaultInputClassName =
    'w-full h-12 rounded-md border-[1px] border-[#0000004D] p-2 py-6 focus:outline-slate-400'

  const defaultIconClassName = 'pointer-events-none absolute top-0 right-0'

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
