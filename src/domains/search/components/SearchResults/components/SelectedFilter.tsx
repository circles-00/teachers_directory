import { type FC } from 'react'
import { type TFilterItem } from '@domains/search'
import { CircledXIcon } from '@components'

interface ISelectedFilterProps {
  item: TFilterItem
  removeFilter: (item: TFilterItem) => void
}

export const SelectedFilter: FC<ISelectedFilterProps> = ({
  item,
  removeFilter,
}) => {
  return (
    <div className="flex w-fit items-center justify-between rounded-md border-[1px] border-[#C4C6C8] bg-[#EDF0F2] px-4 py-2 hover:bg-gray-300">
      <p className="font-medium text-[#797995]">{item.title}</p>
      <button onClick={() => removeFilter(item)}>
        <div className="ml-2">
          <CircledXIcon />
        </div>
      </button>
    </div>
  )
}
