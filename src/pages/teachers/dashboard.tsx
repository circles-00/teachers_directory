import { type NextPage } from 'next'
import { useUser } from '~/hooks/useAuth'

const TeacherDashboard: NextPage = () => {
  const { user } = useUser()
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Teacher Dashboard</h1>
      <p>
        Welcome back <span className="text-primary">{user?.firstName}</span>{' '}
        <span className="text-primary">{user?.lastName}</span>
      </p>
      <p>Work in progress...</p>
    </div>
  )
}

export default TeacherDashboard
