import { RadioGroup } from '@headlessui/react'
import { type CommonRadioGroupProps } from './types'
import { mergeClassNames } from '@utils'

export const CommonRadioGroup = <T,>({
  value,
  options,
  onChange,
  className = '',
}: CommonRadioGroupProps<T>) => {
  const defaultClassName = 'flex w-11/12 gap-4'

  return (
    <RadioGroup
      className={mergeClassNames([defaultClassName, className])}
      value={value}
      onChange={(value) => onChange(value)}
    >
      {options.map((option, index) => (
        <RadioGroup.Option
          key={index}
          className="w-full cursor-pointer rounded-md border-[1px] border-[#0000004D]"
          value={option.value}
        >
          {({ checked }) => (
            <div className="flex items-center gap-4 py-3 px-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-black">
                {checked && (
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                )}
              </div>
              <span className="text-[#919EAB]">{option.label}</span>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
