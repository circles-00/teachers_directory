import { useCallback, type FC, useState, type FormEvent } from 'react'
import { Input } from '@components'
import { useLabels } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'
import { useSearchActions, useSearchKeyword } from '@hooks'

interface ISearchBarProps {
  setSearchKeyword: (searchKeyword: string) => void
}

export const SearchBar: FC<ISearchBarProps> = ({ setSearchKeyword }) => {
  const [localSearchKeyword, setLocalSearchKeyword] = useState('')

  const searchKeyword = useSearchKeyword()
  const { setSearchKeyword: setGlobalSearchKeyword } = useSearchActions()

  useUpdate(() => {
    if (!!searchKeyword) {
      setLocalSearchKeyword(searchKeyword)
    }
  }, [searchKeyword])

  const { labels } = useLabels()

  const handleOnSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setSearchKeyword(localSearchKeyword)
      setGlobalSearchKeyword(localSearchKeyword)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [localSearchKeyword, setGlobalSearchKeyword, setSearchKeyword]
  )

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-5 flex w-full items-center">
        <div className="flex flex-col justify-between gap-3 rounded-sm px-4 py-4 md:flex-row md:items-center">
          <Input
            label={labels.search}
            value={localSearchKeyword}
            onChange={setLocalSearchKeyword}
            labelClassName="font-bold"
            placeholder="Keyword e.g. subject, teacher's name, proof reading"
            className="h-13 rounded-md border-[1px] border-[#919EAB4D] pl-4 text-[18px]"
          />
          <Input
            label={labels.location}
            labelClassName="font-bold"
            containerClassName="md:w-4/6"
            placeholder="Location or postcode"
            className="h-13 rounded-md border-[1px] border-[#919EAB4D] pl-4 text-[18px]"
          />
          <Input
            label={labels.searchRadius}
            labelClassName="font-bold"
            placeholder="Distance"
            containerClassName="md:w-5/12"
            className="h-13 rounded-md border-[1px] border-[#919EAB4D] pl-4 text-[18px]"
          />
          <button className="mt-8 h-12 rounded-md bg-buttonPrimary px-10 font-medium text-white">
            {labels.search}
          </button>
        </div>
      </div>
    </form>
  )
}
