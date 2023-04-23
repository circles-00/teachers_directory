import { type NextPage } from 'next'
import { FilterPanel, type Item, type TFilterItem } from '@domains/search'
import { SearchResults } from '@domains/search/components/SearchResults'
import { useState } from 'react'

const filterItems: Item[] = [
  {
    title: 'Hours',
    items: [
      {
        title: 'Full-time',
        value: 'fullTime',
        count: 564,
      },
      {
        title: 'Part-time',
        value: 'partTime',
        count: 87,
      },
      {
        title: 'Supply work',
        value: 'supplyWork',
        count: 135,
      },
    ],
  },
  {
    title: 'Position',
    items: [
      {
        title: 'Leadership/Management',
        value: 'leadershipManagement',
        count: 266,
        subItems: [
          {
            title: 'Head teacher',
            value: 'headTeacher',
            count: 196,
          },
          {
            title: 'Deputy',
            value: 'deputy',
            count: 11,
          },
          {
            title: 'Assistant',
            value: 'assistant',
            count: 59,
          },
        ],
      },
      {
        title: 'Teaching/Lecturing',
        value: 'teachingLecturing',
        count: 475,
        subItems: [
          {
            title: 'Teacher',
            value: 'teacher',
            count: 401,
          },
          {
            title: 'Tutor',
            value: 'tutor',
            count: 28,
          },
          {
            title: 'Head of department',
            value: 'headOfDepartment',
            count: 41,
          },
        ],
      },
      {
        title: 'Non-teaching/Support',
        value: 'nonTeachingSupport',
        count: 24,
        subItems: [
          {
            title: 'Lorem',
            value: 'lorem',
            count: 16,
          },
          {
            title: 'Ipsum amet',
            value: 'ipsumAmet',
            count: 18,
          },
        ],
      },
    ],
  },
  {
    title: 'Exam board',
    items: [
      {
        title: 'AQA',
        value: 'aqa',
      },
      {
        title: 'OCR',
        value: 'ocr',
      },
      {
        title: 'Edexcel',
        value: 'edexcel',
      },
      {
        title: 'CCEA',
        value: 'ccea',
      },
      {
        title: 'WJEC/Eduqas',
        value: 'wjecEduqas',
      },
    ],
  },
]

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
    <div className="mt-10 flex flex-col gap-10 py-4 md:mx-52 md:flex-row">
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
