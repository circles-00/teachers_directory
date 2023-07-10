import { type FC, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { FilterMenu } from './components'

interface IFilterPanelProps {
  filterItem: INode
}

export const FilterPanel: FC<IFilterPanelProps> = ({ filterItem }) => {
  const [isOpen, setIsOpen] = useState(true)

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
        {filterItem?.children?.map((item, index) => (
          <FilterMenu item={item} key={index} />
        ))}
      </div>
    </div>
  )
}
