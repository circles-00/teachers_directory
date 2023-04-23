import { type FC } from 'react'
import { SearchResultCard, SelectedFilter } from './components'
import { type TFilterItem } from '@domains/search'

interface ISearchResultsProps {
  selectedFilters: TFilterItem[]
  removeFilter: (item: TFilterItem) => void
}

export const SearchResults: FC<ISearchResultsProps> = ({
  selectedFilters,
  removeFilter,
}) => {
  return (
    <div className="flex flex-col px-6 md:w-3/4 md:px-0">
      <h3 className="text-2xl font-bold">
        <span className="text-primary">378 </span>
        Teachers teaching Maths near you
      </h3>

      <div className="mt-4 mb-4 flex flex-wrap gap-3">
        {selectedFilters?.map((filter, index) => (
          <SelectedFilter
            item={filter}
            removeFilter={removeFilter}
            key={index}
          />
        ))}
      </div>

      <SearchResultCard />
    </div>
  )
}
