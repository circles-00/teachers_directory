import { type NextPage } from 'next'
import { Dashboard } from '@domains/teachers'

const TeacherDashboard: NextPage = () => {
  return (
    <div className="my-10 flex">
      <div className="ml-96">
        <Dashboard />
      </div>
    </div>
  )
}

export default TeacherDashboard
