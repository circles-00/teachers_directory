import { type FC, Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { mergeClassNames } from '@utils'

type Option = {
  value: string
}

interface IAutoCompleteProps {
  options: Option[]
  placeholder?: string
  containerClassName?: string
}

export const AutoComplete: FC<IAutoCompleteProps> = ({
  options,
  placeholder = 'Select',
  containerClassName = '',
}) => {
  const [selected, setSelected] = useState<Option | null>(null)
  const [query, setQuery] = useState('')
  const [showPlaceholder, setShowPlaceholder] = useState(!selected?.value)

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.value
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  const defaultContainerClassName = 'relative w-full'

  return (
    <div
      className={mergeClassNames([
        defaultContainerClassName,
        containerClassName,
      ])}
    >
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              onBlur={() => setShowPlaceholder(!selected?.value)}
              onFocus={() => setShowPlaceholder(false)}
              className={`w-full rounded-lg border-[1px] border-[#919EAB52] py-4 pl-3 pr-10 text-sm leading-5 ${
                showPlaceholder ? 'text-[#919EAB]' : ''
              } focus:outline-0 focus:ring-0`}
              displayValue={(option: Option | null) =>
                showPlaceholder ? placeholder : option?.value ?? ''
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option, idx) => (
                  <Combobox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? 'bg-primaryTransparent-16' : ''
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.value}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
