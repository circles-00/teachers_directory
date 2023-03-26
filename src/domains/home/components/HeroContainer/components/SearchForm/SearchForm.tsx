import { type FC } from 'react'

// TODO: Refactor forms when integrating with react-hook-form, for now we just want the looks

interface ISearchFormProps {}

export const SearchForm: FC<ISearchFormProps> = () => {
  return (
    <div className="mt-12 flex w-full items-center justify-center">
      <div className="flex w-5/6 flex-col justify-evenly rounded-sm bg-[#F2F7F2] px-4 py-8 md:w-4/6 md:flex-row md:items-center">
        <div className="flex w-full flex-col md:w-[70%]">
          <label htmlFor="search" className="pb-2 font-bold">
            Search
          </label>
          <input
            id="search"
            placeholder="Enter teacher's name, subject or school"
            className="h-16 rounded-md border-[1px] border-[#919EAB4D] pl-4 font-bold"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="search" className="pb-2 font-bold">
            Location
          </label>
          <input
            id="search"
            placeholder="Location or postcode"
            className="h-16 rounded-md	border-[1px] border-[#919EAB4D] pl-4 font-bold"
            type="text"
          />
        </div>
        <button className="mt-8 h-16 rounded-md bg-primary px-6 text-white">
          Search
        </button>
      </div>
    </div>
  )
}
