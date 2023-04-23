import { type FC } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { type TFilterItem } from '@domains/search'

interface ISelectedFilterProps {
  item: TFilterItem
  removeFilter: (item: TFilterItem) => void
}

export const SelectedFilter: FC<ISelectedFilterProps> = ({
  item,
  removeFilter,
}) => {
  return (
    <div className="flex w-fit items-center justify-between rounded-md border-[1px] border-[#C4C6C8] bg-[#EDF0F2] px-4 py-2">
      <p className="font-medium text-[#797995]">{item.title}</p>
      <button onClick={() => removeFilter(item)}>
        <XCircleIcon className="ml-2 h-6 w-6 text-[#79799559]" />
      </button>
    </div>
  )
}
