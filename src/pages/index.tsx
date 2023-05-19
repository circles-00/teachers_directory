import { HeroContainer, SchoolShowcase, TeacherShowcase } from "@domains/home";
import { type TeachersDirectoryPage } from "~/types/page";
import { EScreenId } from "@domains/screen";

const Home: Pick<TeachersDirectoryPage, 'screenId'> = () => {
  return (
    <div>
      <HeroContainer />
      <TeacherShowcase />
      <SchoolShowcase />
    </div>
  )
}

Home.screenId = EScreenId.HOME
export default Home
