import { HeroContainer, SchoolShowcase, TeacherShowcase } from '@domains/home'
import { type TeachersDirectoryPage } from '~/types/page'

const Home: TeachersDirectoryPage = () => {
  return (
    <div>
      <HeroContainer />
      <TeacherShowcase />
      <SchoolShowcase />
    </div>
  )
}

export default Home
