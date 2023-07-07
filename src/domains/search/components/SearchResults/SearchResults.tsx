import { type FC } from 'react'
import { SearchResultCard } from './components'
import { type TTeacher } from '../../../../server/api/types'

interface ISearchResultsProps {
  teacher: TTeacher
}

export const SearchResults: FC<ISearchResultsProps> = ({ teacher }) => {
  return (
    <div className="flex flex-col px-6 2xl:px-0">
      <SearchResultCard teacher={teacher} />
    </div>
  )
}
