import {
  AvailabilityQuestionnaire,
  BadgesQuestionnaire,
  CurrentStepComponent,
  ExperienceQuestionnaire,
  LocationQuestionnaire,
  OtherServicesQuestionnaire,
  ProfileQuestionnaire,
  QualificationsQuestionnaire,
  StepperSidebar,
  SubjectsQuestionnaire,
} from '@domains/sign-up'
import { useState } from 'react'
import { type TeachersDirectoryPage } from '~/types/page'

const steps = [
  {
    title: 'Where you live?',
    component: LocationQuestionnaire,
  },
  {
    title: 'Subjects you teach',
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
    title: 'Availability?',
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
      <div className="mt-2 lg:w-5/6 xl:w-7/12">
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

export default TeachersSignUpPage
