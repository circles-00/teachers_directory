import { type FC, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { FilterMenu } from './components'
import { type Item, type TFilterItem } from './types'

interface IFilterPanelProps {
  filterItem: Item
  onChange: (item: TFilterItem) => void
  selectedFilters: TFilterItem[]
}

export const FilterPanel: FC<IFilterPanelProps> = ({
  filterItem,
  onChange,
  selectedFilters,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const isSelected = (item: TFilterItem) => {
    return selectedFilters?.some((i) => i.title === item.title)
  }

  return (
    <div className="flex flex-col px-6 md:ml-10 md:px-0">
      <button className={`flex flex-col`} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex w-full items-center justify-between py-4 px-4">
          <h3 className={`${isOpen ? 'text-primary' : ''} font-bold`}>
            {filterItem.title}
          </h3>
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 stroke-primary stroke-2" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 stroke-2" />
          )}{' '}
        </div>
        <div
          className={`mx-auto w-11/12 border-t-2 ${
            isOpen ? 'border-primary' : 'border-[#E5E7EB]'
          }`}
        ></div>
      </button>

      <div
        className={`flex flex-col gap-3 py-4 px-4 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {filterItem?.items.map((item, index) => (
          <FilterMenu
            isSelected={isSelected}
            item={item}
            onChange={onChange}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
