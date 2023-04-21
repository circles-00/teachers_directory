import { type FC } from 'react'
import { Input } from '@components'
import { useLabels } from '@utils'

// TODO: Refactor forms when integrating with react-hook-form, for now we just want the looks

interface ISearchFormProps {}

export const SearchForm: FC<ISearchFormProps> = () => {
  const { labels } = useLabels()

  return (
    <div className="mt-12 flex w-full items-center justify-center">
      <div className="flex w-5/6 flex-col justify-between gap-3 rounded-sm bg-[#F2F7F2] px-4 py-4 md:w-[52.5%] md:flex-row md:items-center">
        <Input
          label={labels.search}
          labelClassName="font-bold"
          placeholder="Enter teacher's name, subject or school"
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
        <button className="mt-8 h-12 rounded-md bg-primary px-10 font-medium text-white">
          {labels.search}
        </button>
      </div>
    </div>
  )
}
