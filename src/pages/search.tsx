import {
  filterItems,
  FilterPanel,
  type Item,
  type TFilterItem,
} from '@domains/search'
import {
  SearchResults,
  SelectedFilter,
} from '@domains/search/components/SearchResults'
import { useCallback, useMemo, useState } from 'react'
import { type TeachersDirectoryPage } from '~/types/page'
import { api } from '../utils'
import { useUpdate } from '@rounik/react-custom-hooks'
import { TableViewIcon, GridViewIcon } from '../components'
import { isEmpty } from 'lodash'

type TFilter = {
  relation: string
  nestedRelation?: string
  isNested: boolean
  value: string[]
  isParent: boolean
}

const Search: TeachersDirectoryPage = () => {
  // TODO: Refactor all of this
  const [filters, setFilters] = useState<TFilter[]>([])

  const selectedFiltersCheckboxes = useMemo(
    () => filters.map((item) => item.value).flat(),
    [filters]
  )

  const selectedFiltersItems = useMemo(
    () => filters.map((item) => item.value).flat(),
    [filters]
  )
  const { data, refetch } = api.teachers.searchTeachers.useQuery(filters)

  const removeFilterByTitle = useCallback(
    (itemToRemove: string) => {
      setFilters(filters.filter((i) => !i.value.includes(itemToRemove)))
    },
    [filters]
  )

  const removeFilterByRelation = useCallback(
    (relation: string) => {
      setFilters(filters.filter((i) => i.relation !== relation))
    },
    [filters]
  )

  const removeFilter = useCallback(
    (item: TFilterItem, parent: Item) => {
      const isItemParent = item.hasOwnProperty('subItems')

      // REMOVE ONLY THE CHILD FILTER
      const existingValueFilter = {
        ...filters.find((i) => i.value.includes(item.title)),
      }

      if (!isEmpty(existingValueFilter)) {
        if (isItemParent) {
          removeFilterByRelation(parent?.relation ?? '')

          return
        }

        if (existingValueFilter?.value?.length === 1) {
          removeFilterByTitle(item?.title)

          return
        }

        existingValueFilter.value = existingValueFilter?.value?.filter(
          (i) => i !== item.title
        )

        setFilters([
          // Remove the existing filter & update the value
          ...filters.filter(
            (i) => i.relation !== existingValueFilter?.relation
          ),
          existingValueFilter as TFilter,
        ])

        return
      }
    },
    [filters, removeFilterByRelation, removeFilterByTitle]
  )

  const selectSubItemsToFilter = useCallback(
    (item: TFilterItem, parent: Item) => {
      return {
        relation: parent.relation as string,
        isNested: true,
        value:
          item?.subItems
            ?.map((subItem) => subItem?.title)
            ?.filter(
              (subItemTitle) => !selectedFiltersItems.includes(subItemTitle)
            ) ?? [],
        nestedRelation: parent?.nestedRelations?.[1],
        isParent: false,
      }
    },
    [selectedFiltersItems]
  )

  const handleGenericFilters = useCallback(
    (item: TFilterItem, parent: Item) => {
      const isItemParent = item.hasOwnProperty('subItems')
      const existingValueFilter = {
        ...filters.find((i) => i.value.includes(item.title)),
      }

      if (!isEmpty(existingValueFilter)) {
        removeFilter(item, parent)

        return
      }

      const isNested = parent.hasOwnProperty('nestedRelations')

      const existingRelationFilter = filters.find(
        (i) => i.relation === parent.relation || i.relation === item?.relation
      )

      if (existingRelationFilter) {
        // If you find the filter, update the value
        const filter = [
          ...filters.filter(
            (i) =>
              i.relation !== parent.relation && i.relation !== item?.relation
          ),
          {
            ...existingRelationFilter,
            value: [...existingRelationFilter.value, item.title],
          },
        ]

        // SELECT ALL SUBITEMS IF THE PARENT IS SELECTED
        if (isItemParent) {
          filter.push(selectSubItemsToFilter(item, parent))
        }

        setFilters(filter)

        return
      }

      const filter = [
        ...filters,
        {
          relation: parent.relation ?? item?.relation ?? '',
          isNested,
          value: [item.title],
          nestedRelation: !isNested
            ? undefined
            : item.hasOwnProperty('subItems')
            ? parent?.nestedRelations?.[0]
            : parent?.nestedRelations?.[1],
          isParent: isItemParent,
        },
      ]

      // SELECT ALL SUBITEMS IF THE PARENT IS SELECTED
      if (isItemParent) {
        filter.push(selectSubItemsToFilter(item, parent))
      }

      // If you don't find the filter, add it
      setFilters(filter)
    },
    [filters, removeFilter, selectSubItemsToFilter]
  )

  const onChange = (item: TFilterItem, parent: Item) => {
    if (!!parent.relation) {
      handleGenericFilters(item, parent)
    }

    if (item?.isSpecific) {
      setFilters([...filters])
    }
  }

  useUpdate(() => {
    refetch().catch(console.error)
  }, [filters])

  return (
    <div className="mt-10 flex flex-col gap-10 py-4 md:flex-row 2xl:mx-10">
      <div className="flex flex-col gap-4 md:w-1/4">
        {filterItems.map((filterItem, index) => (
          <FilterPanel
            key={index}
            filterItem={filterItem}
            onChange={onChange}
            selectedFilters={selectedFiltersCheckboxes}
          />
        ))}
      </div>

      <div className="flex w-full flex-col md:w-3/4">
        <h3 className="text-2xl font-bold">
          <span className="text-primary">{`${data?.length ?? 0} `}</span>
          Matching Teachers
        </h3>

        <div className="my-5 flex">
          <div className="flex w-10/12 flex-wrap gap-3">
            {selectedFiltersItems?.map((filter, index) => (
              <SelectedFilter
                item={filter}
                removeFilter={removeFilterByTitle}
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

        {data?.map((teacher) => (
          <SearchResults teacher={teacher} key={teacher.id} />
        ))}
      </div>
    </div>
  )
}

export default Search
