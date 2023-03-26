import { type NextPage } from 'next'
import {
  HeroContainer,
  SchoolShowcase,
  TeacherShowcase,
  WhoWeAre,
} from '@domains/home'

const Home: NextPage = () => {
  return (
    <div>
      <HeroContainer />
      <SchoolShowcase />
      <TeacherShowcase />
      <WhoWeAre />
    </div>
  )
}

export default Home
