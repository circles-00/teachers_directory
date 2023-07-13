import { useState, type FC } from 'react'
import { FilterItem } from './FilterItem'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface IFilterMenuProps {
  item: INode
}

export const FilterMenu: FC<IFilterMenuProps> = ({ item }) => {
  const [areSubItemsOpen, setAreSubItemsOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between gap-2">
        <FilterItem item={item} />

        {item.children && (
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
      {item.children && areSubItemsOpen && (
        <div className="ml-4 mt-3 flex flex-col gap-3">
          {item.children.map((subItem, index) => (
            <FilterItem key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  )
}
