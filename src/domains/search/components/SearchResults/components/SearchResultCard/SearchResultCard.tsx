import { type FC } from 'react'
import Image from 'next/image'
import SearchResultPng from '@assets/search_result.png'
import { TeacherInformation } from '@domains/search/components/SearchResults/components/SearchResultCard/TeacherInformation'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Popover } from '@headlessui/react'

interface ISearchResultCardProps {}

const Subjects = () => (
  <Popover className="relative">
    <Popover.Button className="mt-4 flex w-full items-center gap-2 rounded-lg bg-[#2E9BFB29] py-2 pl-3 focus:outline-0">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold text-[#2E9BFB]">
        4
      </div>
      <p className="text-sm font-bold">Subjects</p>
      <PlusIcon className="ml-auto mr-3 h-6 w-6 text-white" />
    </Popover.Button>

    <Popover.Panel className="w- absolute top-12 left-0 right-0 z-10 m-auto w-44 rounded-md bg-white p-4 shadow-md">
      <div className="flex flex-col gap-2 text-sm">
        <p>Proof reading</p>
        <p>Tutoring</p>
        <p>Editing</p>
        <p>Consultancy</p>
      </div>

      <img src="/solutions.jpg" alt="" />
    </Popover.Panel>
  </Popover>
)

export const SearchResultCard: FC<ISearchResultCardProps> = () => {
  return (
    <div className="flex flex-col rounded-md border-2 border-[#D6DFE5] shadow-md">
      <div className="flex flex-col p-6 md:flex-row">
        <div className="md:w-4/12">
          <Image
            src={SearchResultPng.src}
            className="h-full w-full md:h-auto"
            width={0}
            height={0}
            alt="Search Result"
            sizes="100vw"
          />
          <Subjects />
        </div>
        <TeacherInformation />
      </div>
      <hr className="fill-[#D6DFE5]" />
      <div className="flex flex-col py-1 md:flex-row">
        <h3 className="border-r-[1px] py-2 px-9 font-medium text-primary md:px-6">
          Secondary teacher
        </h3>
        <h3 className="border-r-[1px] py-2 px-9 font-medium">
          1 year experience
        </h3>
        <h3 className="border-r-[1px] py-2 px-9 font-medium">QTS</h3>
        <h3 className="border-r-[1px] py-2 px-9 font-medium">DBS</h3>
        <h3 className="py-2 px-9 font-medium">Qualified Teacher</h3>
      </div>
    </div>
  )
}
