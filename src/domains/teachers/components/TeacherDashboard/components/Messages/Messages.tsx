import { type FC } from 'react'
import { IconInput, VerticalDotsMenu } from '@components'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { SingleMessage } from './SingleMessage'

const messages = [
  {
    contactName: 'Jayvion Simon',
    title: 'Lorem Ipsum',
    date: '12 Jan 2022',
    status: 'online',
  },
  {
    contactName: 'Lucian Obrien',
    title: 'Re: Lorem Ipsum',
    date: '11 Feb 2022',
    status: 'offline',
  },
  {
    contactName: 'Deja Brady',
    title: 'Feedback Management',
    date: '10 Sep 2022',
    status: 'offline',
  },
  {
    contactName: 'Reece Chung',
    title: 'Optimization And Advertising',
    date: '08 Apr 2022',
    status: 'offline',
  },
]

interface IMessagesProps {}

const Divider = () => <hr className="mt-4 w-full fill-[#919EAB]" />

export const Messages: FC<IMessagesProps> = () => {
  return (
    <div className="flex h-fit flex-col rounded-xl border-2 border-gray-100 pt-7">
      <div className="flex items-center px-8">
        <h1 className="text-lg font-bold">Messages</h1>
        <button className="ml-auto">
          <VerticalDotsMenu />
        </button>
      </div>
      <Divider />
      <div className="mt-6 mb-2 w-full px-6">
        <IconInput
          className="h-11 border-[1px] border-[#919EAB52] py-3 pl-16"
          iconClassName="top-3 left-5"
          placeholder="Search"
          iconPosition="left"
          Icon={MagnifyingGlassIcon}
        />
      </div>
      <Divider />
      {messages.map((message, index) => (
        <SingleMessage
          key={index}
          {...message}
          index={index}
          totalMessages={messages.length}
        />
      ))}
    </div>
  )
}
