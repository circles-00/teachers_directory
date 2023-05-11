import { type NextPage } from 'next'
import {
  filterItems,
  FilterPanel,
  type Item,
  type TFilterItem,
} from '@domains/search'
import { SearchResults } from '@domains/search/components/SearchResults'
import { useState } from 'react'

const Search: NextPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<TFilterItem[]>([])
  console.log({ selectedFilters })

  const addFilter = (item: TFilterItem) => {
    if (selectedFilters) {
      setSelectedFilters([...selectedFilters, item])
    }
  }

  const removeFilter = (item: TFilterItem) => {
    if (selectedFilters) {
      // TODO: Compare by id in the future
      setSelectedFilters(selectedFilters.filter((i) => i.title !== item.title))
    }
  }

  const onChange = (item: TFilterItem) => {
    if (selectedFilters?.find((i) => i.title === item.title)) {
      removeFilter(item)
    } else {
      addFilter(item)
    }
  }

  return (
    <div className="mt-10 flex flex-col gap-10 py-4 md:flex-row 2xl:mx-10">
      <div className="flex flex-col gap-4 md:w-1/4">
        {filterItems.map((filterItem, index) => (
          <FilterPanel
            key={index}
            filterItem={filterItem}
            onChange={onChange}
            selectedFilters={selectedFilters}
          />
        ))}
      </div>
      <SearchResults
        removeFilter={removeFilter}
        selectedFilters={selectedFilters}
      />
    </div>
  )
}

export default Search
