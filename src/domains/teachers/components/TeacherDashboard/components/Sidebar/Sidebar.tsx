import { type FC } from 'react'
import {
  ButtonContained,
  DashboardIcon,
  DocsIllustration,
  MailIcon,
  UserIcon,
} from '@components'
import { useUser } from '@hooks'

interface ISidebarProps {}

export const Sidebar: FC<ISidebarProps> = () => {
  const { userFullName } = useUser()

  return (
    <div className="mr-10 mb-10 hidden w-1/6 flex-col border-r-[1px] border-dashed p-7 xl:flex">
      <p className={`text-xs font-bold uppercase text-[#637381]`}>General</p>

      <button className="mt-1 flex w-full items-center gap-4 rounded-md p-4 text-sm hover:bg-[#00AB5514]">
        <DashboardIcon /> Dashboard
      </button>

      <button className="mt-1 flex w-full items-center gap-4 rounded-md bg-[#00AB5514] p-4 text-sm font-semibold text-primary">
        <UserIcon /> Teachers profile
      </button>

      <button className="flex items-center gap-4 p-4 text-sm font-semibold">
        <div className="h-2 w-2 rounded-full bg-primary" />
        Profile
      </button>

      {/* TODO: Refactor, abstract as component */}

      <button className="flex items-center gap-4 p-4 text-sm hover:font-semibold">
        <div className="h-1 w-1 rounded-full bg-[#637381]" />
        Availability
      </button>

      <button className="flex items-center gap-4 p-4 text-sm hover:font-semibold">
        <div className="h-1 w-1 rounded-full bg-[#637381]" />
        Qualifications
      </button>

      <button className="flex items-center gap-4 p-4 text-sm hover:font-semibold">
        <div className="h-1 w-1 rounded-full bg-[#637381]" />
        Other achievements
      </button>

      <button className="flex items-center gap-4 p-4 text-sm hover:font-semibold">
        <div className="h-1 w-1 rounded-full bg-[#637381]" />
        Subjects
      </button>

      <button className="flex items-center gap-4 p-4 text-sm hover:font-semibold">
        <div className="h-1 w-1 rounded-full bg-[#637381]" />
        Social links
      </button>

      <button className="mt-1 flex w-full items-center gap-4 rounded-md p-4 text-sm font-semibold hover:bg-[#00AB5514]">
        <MailIcon /> Messages
        <div className="ml-auto rounded-lg bg-[#FF563029] p-2 text-xs font-bold text-[#B71D18]">
          32+
        </div>
      </button>

      <div className="mx-auto mt-auto pb-24">
        <DocsIllustration />
        <div className="mt-4 flex flex-col items-center gap-4 text-center text-[#212B36]">
          <p className="font-bold">Hi, {userFullName}</p>
          <p className="text-sm text-[#919EAB]">
            Need help, <br /> Please check our docs
          </p>
          <ButtonContained className="w-fit px-5 font-bold text-white">
            Documentation
          </ButtonContained>
        </div>
      </div>
    </div>
  )
}
