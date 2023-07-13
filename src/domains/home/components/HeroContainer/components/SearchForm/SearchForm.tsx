import { useState, type FC, useCallback } from 'react'
import { Input } from '@components'
import { useLabels } from '@utils'
import { useSearchActions } from '@hooks'
import { useRouter } from 'next/router'

// TODO: Refactor forms when integrating with react-hook-form, for now we just want the looks

interface ISearchFormProps {}

export const SearchForm: FC<ISearchFormProps> = () => {
  const router = useRouter()
  const [searchKeywordState, setSearchKeywordState] = useState('')

  const { labels } = useLabels()
  const { setSearchKeyword } = useSearchActions()

  const handleOnSubmit = useCallback(() => {
    setSearchKeyword(searchKeywordState)
    router.push('/search').catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeywordState, setSearchKeyword])

  return (
    <div className="mt-12 flex w-full items-center justify-center">
      <div className="flex w-5/6 flex-col justify-between gap-3 rounded-sm bg-[#F2F7F2] px-4 py-4 md:w-3/5 md:flex-row md:items-center">
        <Input
          label={labels.search}
          onChange={setSearchKeywordState}
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
        <button
          onClick={handleOnSubmit}
          className="mt-8 h-12 rounded-md bg-buttonPrimary px-10 font-medium text-white"
        >
          {labels.search}
        </button>
      </div>
    </div>
  )
}
