import { type FC } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { SingleContact } from './SingleContact'

interface IContactsProps {}

const contacts = [
  {
    name: 'Jayvion Simon',
    email: 'nannie_abernathy70@yahoo.com',
  },
  {
    name: 'Reece Chung',
    email: 'letha_lubowitz24@yahoo.com',
  },
  {
    name: 'Deja Brady',
    email: 'milo.farrell@hotmail.com',
  },
  {
    name: 'Harrison Stein',
    email: 'violet.ratke86@yahoo.com',
  },
  {
    name: 'Lucian Obrien',
    email: 'ashlynn_ohara62@gmail.com',
  },
]

const Divider = () => <hr className="mt-4 w-full fill-[#919EAB]" />

function ViewAllSection() {
  return (
    <div>
      <Divider />
      <div className="px-7 py-6">
        <button
          className="w-full rounded-xl border-[1px] border-[#919EAB52] py-4 text-sm font-bold"
          type="button"
        >
          View All
        </button>
      </div>
    </div>
  )
}

export const Contacts: FC<IContactsProps> = () => {
  return (
    <div className="flex h-fit flex-col rounded-xl border-2 border-gray-100 pt-7">
      <div className="flex items-center px-8">
        <div>
          <h1 className="text-lg font-bold">Contacts</h1>
          <p className="text-sm text-[#637381]">You have 12 contacts</p>
        </div>

        <button className="ml-auto">
          <PlusIcon className="h-7 w-7 fill-[#00AB55] stroke-1" />
        </button>
      </div>
      <Divider />
      {contacts.map((contact, index) => (
        <SingleContact {...contact} key={index} />
      ))}
      <ViewAllSection />
    </div>
  )
}
