import { type FC } from 'react'
import { useUser } from '~/hooks/useAuth'
import { StatisticsHeader } from './components'
import { ProfileCompletion } from '@domains/teachers/components/TeacherDashboard/components/ProfileCompletion'

interface IDashboardProps {}

export const Dashboard: FC<IDashboardProps> = () => {
  const { user } = useUser()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-primary">
        Hi {user?.firstName}, Welcome back
      </h1>
      <StatisticsHeader />
      <ProfileCompletion />
    </div>
  )
}
