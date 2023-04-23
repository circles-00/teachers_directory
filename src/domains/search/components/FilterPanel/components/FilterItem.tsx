import { type FC } from 'react'
import { type TFilterItem } from '@domains/search'

interface IFilterItemProps {
  item: TFilterItem
  onChange: (item: TFilterItem) => void
  isSelected: boolean
}

export const FilterItem: FC<IFilterItemProps> = ({
  item,
  onChange,
  isSelected,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        onChange={() => onChange(item)}
        className="h-5 w-5 accent-primary"
        type="checkbox"
        checked={isSelected}
      />
      <p className="text-[#1A1A2B]">
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
