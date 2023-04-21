import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useState, type FC, Fragment } from 'react'

type Option = {
  value: string
}

interface ISelectProps {
  options: Option[]
  placeholder?: string
}

export const Select: FC<ISelectProps> = ({
  options,
  placeholder = 'Select',
}) => {
  const [selected, setSelected] = useState<Option | null>(null)
  const showPlaceholder = !selected?.value

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative w-full cursor-default rounded-lg border-[1px] border-[#919EAB52] bg-white py-4 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span
            className={`block truncate ${
              showPlaceholder ? 'text-[#919EAB]' : ''
            }`}
          >
            {selected?.value ?? placeholder}
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
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primaryTransparent-16' : ''
                  }`
                }
                value={option}
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
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
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
