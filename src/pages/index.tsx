import { type NextPage } from 'next'
import { HeroContainer, SchoolShowcase, TeacherShowcase } from '@domains/home'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data } = useSession()
  console.log(data)
  return (
    <div>
      <HeroContainer />
      <TeacherShowcase />
      <SchoolShowcase />
    </div>
  )
}

export default Home
