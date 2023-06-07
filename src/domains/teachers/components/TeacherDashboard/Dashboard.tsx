import { type FC } from 'react'
import { useUser } from '~/hooks/useAuth'
import { Messages, StatisticsHeader } from './components'
import { ProfileCompletion } from '@domains/teachers/components/TeacherDashboard/components/ProfileCompletion'
import { Contacts } from '@domains/teachers/components/TeacherDashboard/components/Contacts'
import { NetworkSchools } from '@domains/teachers/components/TeacherDashboard/components/NetworkSchools'

interface IDashboardProps {}

export const Dashboard: FC<IDashboardProps> = () => {
  const { user } = useUser()

  return (
    <div className="xs:pl-0 my-10 flex w-full flex-col gap-4 px-5 md:px-16">
      <h1 className="text-2xl font-bold text-primary">
        Hi {user?.firstName}, Welcome back
      </h1>
      <StatisticsHeader />
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex w-full flex-col gap-7">
          <ProfileCompletion />
          <NetworkSchools />
        </div>

        <div className="flex w-full flex-col gap-7">
          <Messages />
          <Contacts />
        </div>
      </div>
    </div>
  )
}
