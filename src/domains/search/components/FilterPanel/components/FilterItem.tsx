import { type FC } from 'react'
import { useCheckBoxTreeContext } from '@domains/search'

interface IFilterItemProps {
  item: INode
}

export const FilterItem: FC<IFilterItemProps> = ({ item }) => {
  const { getCheckboxProps } = useCheckBoxTreeContext()

  return (
    <div className="flex items-center gap-2">
      <input
        {...getCheckboxProps(item.id)}
        className="h-5 w-5 accent-primary"
        type="checkbox"
      />
      <p className="truncate text-[#1A1A2B]">
        {item.title ?? item.label}{' '}
        {/* <span
          className={`text-[#797995] ${!!item.count ? 'visible' : 'invisible'}`}
        >
          ({item.count})
        </span> */}
      </p>
    </div>
  )
}
