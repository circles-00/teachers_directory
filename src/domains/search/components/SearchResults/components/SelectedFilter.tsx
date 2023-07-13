import { type FC } from 'react'
import { CircledXIcon } from '@components'
import { useCheckBoxTreeContext } from '../../../providers'

interface ISelectedFilterProps {
  item: INode
}

export const SelectedFilter: FC<ISelectedFilterProps> = ({ item }) => {
  const { toggleChecked } = useCheckBoxTreeContext()

  return (
    <div className="flex w-fit items-center justify-between rounded-md border-[1px] border-[#C4C6C8] bg-[#EDF0F2] px-4 py-2 hover:bg-gray-300">
      <p className="font-medium text-[#797995]">{item.title ?? item.label}</p>
      <button onClick={() => toggleChecked(item.id)}>
        <div className="ml-2">
          <CircledXIcon />
        </div>
      </button>
    </div>
  )
}
