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
      onChange={onChange}
    >
      {options.map((option, index) => (
        <RadioGroup.Option
          key={index}
          className="w-full cursor-pointer rounded-md border-[1px] border-[#0000004D] hover:bg-primaryTransparent-2"
          value={option.value}
        >
          {({ checked }) => (
            <div
              className={`${
                checked ? 'bg-primary' : ''
              } flex items-center gap-4 py-3 px-4`}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] ${
                  checked ? 'border-white' : 'border-black'
                }`}
              >
                {checked && (
                  <div className="h-3 w-3 rounded-full  bg-white"></div>
                )}
              </div>
              <span
                className={`${
                  checked ? 'font-bold text-white' : 'text-[#919EAB]'
                }`}
              >
                {option.label}
              </span>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
