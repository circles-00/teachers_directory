import { type NextPage } from 'next'
import { Dashboard, Sidebar } from '@domains/teachers'

const TeacherDashboard: NextPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default TeacherDashboard
