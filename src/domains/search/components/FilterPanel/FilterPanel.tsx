import { type FC, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { FilterItem } from './components'
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
      <div
        className={`${
          !isOpen ? 'rounded-md border-b-[1px]' : 'rounded-t-md border-b-0'
        } flex items-center justify-between border-[1px] border-[#8E9BAF] py-4 px-4`}
      >
        <h3>Hours</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 stroke-2" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 stroke-2" />
          )}
        </button>
      </div>

      <div
        className={`flex flex-col gap-3 rounded-b-md border-[1px] border-[#8E9BAF] py-4 px-4 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {filterItem?.items.map((item, index) => (
          <div key={index}>
            <FilterItem
              isSelected={isSelected(item)}
              item={item}
              onChange={onChange}
            />

            {/* "Recursively" render all the subItems */}
            {item.subItems && (
              <div className="ml-4 mt-3 flex flex-col gap-3">
                {item.subItems.map((subItem, index) => (
                  <FilterItem
                    isSelected={isSelected(subItem)}
                    key={index}
                    item={subItem}
                    onChange={onChange}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
