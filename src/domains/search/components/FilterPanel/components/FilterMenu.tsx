import { useState, type FC } from 'react'
import { FilterItem } from './FilterItem'
import { type Item, type TFilterItem } from '../types'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface IFilterMenuProps {
  item: TFilterItem
  onChange: (item: TFilterItem, parent: Item) => void
  isSelected: (item: TFilterItem) => boolean
  parent: Item
}

export const FilterMenu: FC<IFilterMenuProps> = ({
  item,
  onChange,
  isSelected,
  parent,
}) => {
  const [areSubItemsOpen, setAreSubItemsOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between gap-2">
        <FilterItem
          parent={parent}
          isSelected={isSelected(item)}
          item={item}
          onChange={onChange}
        />

        {item.subItems && (
          <button onClick={() => setAreSubItemsOpen(!areSubItemsOpen)}>
            {areSubItemsOpen ? (
              <ChevronUpIcon className="h-5 w-5 stroke-primary stroke-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 stroke-2" />
            )}
          </button>
        )}
      </div>
      {/* "Recursively" render all the subItems */}
      {item.subItems && areSubItemsOpen && (
        <div className="ml-4 mt-3 flex flex-col gap-3">
          {item.subItems.map((subItem, index) => (
            <FilterItem
              parent={parent}
              isSelected={isSelected(subItem)}
              key={index}
              item={subItem}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}
