import {
  LocationQuestionnaire,
  StepperSidebar,
  SubjectsQuestionnaire,
  QualificationsQuestionnaire,
  ExperienceQuestionnaire,
  ProfileQuestionnaire,
  AvailabilityQuestionnaire,
  BadgesQuestionnaire,
  CurrentStepComponent,
  OtherServicesQuestionnaire,
} from '@domains/sign-up'
import { useState } from 'react'
import { type TeachersDirectoryPage } from '~/types/page'

const steps = [
  {
    title: 'Where do you live?',
    component: LocationQuestionnaire,
  },
  {
    title: 'What subjects can you teach?',
    component: SubjectsQuestionnaire,
  },
  {
    title: 'Your qualifications',
    component: QualificationsQuestionnaire,
  },
  {
    title: 'Your teaching life',
    component: ExperienceQuestionnaire,
  },
  {
    title: 'Your profile',
    component: ProfileQuestionnaire,
  },
  {
    title: 'Your availability?',
    component: AvailabilityQuestionnaire,
  },
  {
    title: 'Other services I offer',
    component: OtherServicesQuestionnaire,
  },
  {
    title: 'Badges',
    component: BadgesQuestionnaire,
  },
]

const TeachersSignUpPage: TeachersDirectoryPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="my-10 flex justify-center">
      <StepperSidebar
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="mt-2 w-5/6 md:w-3/6">
        <CurrentStepComponent
          currentStep={currentStep}
          totalSteps={steps.length}
          setCurrentStep={setCurrentStep}
          steps={steps}
        />
      </div>
    </div>
  )
}

TeachersSignUpPage.pageType = 'PRIVATE'

export default TeachersSignUpPage
