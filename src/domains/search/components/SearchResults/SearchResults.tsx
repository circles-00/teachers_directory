import { type FC } from 'react'
import { SearchResultCard, SelectedFilter } from './components'
import { type TFilterItem } from '@domains/search'
import { GridViewIcon, TableViewIcon } from '@components'

interface ISearchResultsProps {
  selectedFilters: TFilterItem[]
  removeFilter: (item: TFilterItem) => void
}

export const SearchResults: FC<ISearchResultsProps> = ({
  selectedFilters,
  removeFilter,
}) => {
  return (
    <div className="flex flex-col px-6 md:w-3/4 2xl:px-0">
      <h3 className="text-2xl font-bold">
        <span className="text-primary">378 </span>
        Teachers teaching <span className="text-primary">Maths</span>
      </h3>

      <div
        className={`${
          selectedFilters.length > 0 ? 'mt-4' : 'mt-[-20px]'
        } mb-8 flex gap-3`}
      >
        <div className="flex w-10/12 flex-wrap gap-3">
          {selectedFilters?.map((filter, index) => (
            <SelectedFilter
              item={filter}
              removeFilter={removeFilter}
              key={index}
            />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <p className="font-bold text-[#797995]">View:</p>
          <button>
            <TableViewIcon active />
          </button>
          <button>
            <GridViewIcon />
          </button>
        </div>
      </div>

      <SearchResultCard />
    </div>
  )
}
