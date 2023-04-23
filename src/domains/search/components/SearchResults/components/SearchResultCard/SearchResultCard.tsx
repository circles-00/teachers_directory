import { type FC } from 'react'
import Image from 'next/image'
import SearchResultPng from '@assets/search_result.png'
import { TeacherInformation } from '@domains/search/components/SearchResults/components/SearchResultCard/TeacherInformation'

interface ISearchResultCardProps {}

export const SearchResultCard: FC<ISearchResultCardProps> = () => {
  return (
    <div className="flex flex-col rounded-md border-2 border-[#D6DFE5] shadow-md">
      <div className="flex flex-col p-6 md:flex-row">
        <Image
          src={SearchResultPng.src}
          width={SearchResultPng.width}
          height={SearchResultPng.height}
          alt="Search Result"
        />
        <TeacherInformation />
      </div>
      <hr className="fill-[#D6DFE5]" />
      <div className="flex flex-col py-6 md:flex-row">
        <h3 className="border-r-[1px] py-2 px-10 font-bold text-primary md:px-6">
          Secondary teacher
        </h3>
        <h3 className="border-r-[1px] py-2 px-10 font-bold">QTS</h3>
        <h3 className="border-r-[1px] py-2 px-10 font-bold">DBS</h3>
        <h3 className="py-2 px-10 font-bold">Other subjects: Writing</h3>
      </div>
    </div>
  )
}
