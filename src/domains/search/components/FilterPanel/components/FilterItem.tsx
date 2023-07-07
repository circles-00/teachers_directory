import { type FC } from 'react'
import { type Item, type TFilterItem } from '@domains/search'

interface IFilterItemProps {
  item: TFilterItem
  onChange: (item: TFilterItem, parent: Item) => void
  isSelected: boolean
  parent: Item
}

export const FilterItem: FC<IFilterItemProps> = ({
  item,
  onChange,
  isSelected,
  parent,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        onChange={() => onChange(item, parent)}
        className="h-5 w-5 accent-primary"
        type="checkbox"
        checked={isSelected}
      />
      <p className="truncate text-[#1A1A2B]">
        {item.title}{' '}
        <span
          className={`text-[#797995] ${!!item.count ? 'visible' : 'invisible'}`}
        >
          ({item.count})
        </span>
      </p>
    </div>
  )
}
