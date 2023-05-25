import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { type FC, Fragment, forwardRef } from 'react'
import { mergeClassNames } from '@utils'
import isEmpty from 'lodash.isempty'

export type SelectOption = {
  value: string
  id?: string
}

export interface ISelectProps {
  options: SelectOption[]
  placeholder?: string
  containerClassName?: string
  onChange?: (value: string) => void
  label?: string
  value?: string
}

// eslint-disable-next-line react/display-name
export const Select: FC<ISelectProps> = forwardRef<
  HTMLInputElement,
  ISelectProps
>(
  (
    {
      options,
      placeholder = 'Select',
      containerClassName = '',
      onChange,
      label,
      value,
    },
    ref
  ) => {
    const showPlaceholder = isEmpty(value)
    const defaultContainerClassName = 'group relative mt-1 w-full'

    const onSelectChange = (value: string | null) => {
      if (value && onChange) onChange(value)
    }

    return (
      <Listbox value={value} onChange={onSelectChange}>
        <div
          className={mergeClassNames([
            defaultContainerClassName,
            containerClassName,
          ])}
        >
          <Listbox.Button className="relative w-full cursor-default rounded-lg border-[1px] border-[#919EAB52] bg-white py-4 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 group-hover:bg-gray-50 sm:text-sm">
            <p className="absolute top-[-11px] left-2 rounded-lg bg-white px-1 text-[10px] text-[#919EAB] group-hover:bg-gray-50">
              {label}
            </p>
            <span
              className={`block truncate ${
                showPlaceholder ? 'text-[#919EAB]' : ''
              }`}
            >
              {!isEmpty(value) ? value : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 stroke-black text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Note: z-10, zIndex is really important here, solves a bug where dropdowns are not visible if stacked on top of each other */}
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-primaryTransparent-16' : ''
                    }`
                  }
                  value={option?.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    )
  }
)
