import { type NextPage } from 'next'
import { HeroContainer, SchoolShowcase, TeacherShowcase } from '@domains/home'

const Home: NextPage = () => {
  return (
    <div>
      <HeroContainer />
      <TeacherShowcase />
      <SchoolShowcase />
    </div>
  )
}

export default Home
