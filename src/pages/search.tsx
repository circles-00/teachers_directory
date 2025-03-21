import { useTreeSelect } from 'react-tree-select-hook'
import { TableViewIcon, GridViewIcon } from '../components'
import { api } from '../utils'
import { useEffect, useMemo, useState } from 'react'
import {
  CheckBoxTreeProvider,
  FilterPanel,
  SearchResults,
  SelectedFilter,
  filterItems,
  SearchBar,
} from '@domains/search'

type TFilter = {
  value: string[]
  relation: string
}

type TSearchPayload = {
  filters: TFilter[]
  searchKeyword?: string
}

export default function Search() {
  const treeMethods = useTreeSelect(filterItems)
  const [areNodesInitialized, setAreNodesInitialized] = useState(false)

  // TODO: Refactor this
  const [searchKeywordState, setSearchKeywordState] = useState('')

  const { nodes, selectNone, simplifiedSelection } = treeMethods

  useEffect(() => {
    selectNone()
    setAreNodesInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedFilters = useMemo(() => {
    const { filters, searchKeyword }: TSearchPayload = {
      searchKeyword: searchKeywordState,
      filters: [] as TFilter[],
    }

    simplifiedSelection.forEach((filter) => {
      let valueToPush: TFilter | null = null

      if (filter.parent) {
        if (filter?.parent?.parent?.id === 'other') {
          valueToPush = {
            relation: filter?.parent?.label,
            value: [filter.label],
          }
        } else if (filter.parent.id === 'other') {
          // SPECIFIC LOGIC FOR THESE 2 FILTERS
          if (
            filter.label === 'qualificationBadges' ||
            filter.label === 'dbsBadges'
          ) {
            const filterExists = filters.find(
              (item) => item.relation === 'badges'
            )

            valueToPush = {
              relation: 'badges',
              value: [...(filterExists?.value ?? []), filter.label],
            }
          } else {
            valueToPush = {
              relation: filter.label,
              value: filter.children?.map((child) => child.label) ?? [],
            }
          }
        } else {
          valueToPush = {
            relation: filter?.parent?.parent?.label ?? filter?.parent?.label,
            value: [filter.label],
          }
        }
      } else {
        valueToPush = {
          relation: filter.id,
          value: filter.children?.map((child) => child?.label) ?? [],
        }
      }

      const filterExists = filters.find(
        (item) => item.relation === valueToPush?.relation
      )

      if (!!filterExists) {
        filterExists.value = [...filterExists.value, ...valueToPush.value]

        return
      }

      filters.push(valueToPush)
    })

    return { searchKeyword, filters }
  }, [searchKeywordState, simplifiedSelection])

  const { data } = api.teachers.searchTeachers.useQuery(selectedFilters, {
    enabled: areNodesInitialized,
  })

  return (
    <CheckBoxTreeProvider data={treeMethods}>
      <div className="mt-10 flex flex-col gap-10 py-4 md:flex-row 2xl:mx-10">
        <div className="flex flex-col gap-4 md:w-1/4">
          {nodes.map((filterItem, index) => (
            <FilterPanel key={index} filterItem={filterItem} />
          ))}
        </div>

        <div className="flex w-full flex-col md:w-3/4">
          <SearchBar setSearchKeyword={setSearchKeywordState} />

          <h3 className="text-2xl font-bold">
            <span className="text-primary">{`${data?.length ?? 0} `}</span>
            Matching Teachers
          </h3>

          <div className="my-5 flex">
            <div className="flex w-10/12 flex-wrap gap-3">
              {simplifiedSelection?.map((filter, index) => (
                <SelectedFilter item={filter} key={index} />
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
    </CheckBoxTreeProvider>
  )
}
