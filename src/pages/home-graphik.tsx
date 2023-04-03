import { type NextPage } from 'next'
import {
  HeroContainer,
  SchoolShowcase,
  TeacherShowcase,
  WhoWeAre,
} from '@domains/home'
import { graphik } from '@utils'

const Home: NextPage = () => {
  return (
    <div className={`${graphik.className}`}>
      <HeroContainer />
      <SchoolShowcase />
      <TeacherShowcase />
      <WhoWeAre />
    </div>
  )
}

export default Home
