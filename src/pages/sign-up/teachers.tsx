import { type NextPage } from 'next'
import {
  LocationQuestionnaire,
  StepperSidebar,
  SubjectsQuestionnaire,
  type StepProps,
  QualificationsQuestionnaire,
  ExperienceQuestionnaire,
} from '@domains/sign-up'
import { type FC, useState, useMemo } from 'react'

const DummyComponent = () => <p>In Progress...</p>

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
    component: DummyComponent,
  },
  {
    title: 'Your availability?',
    component: DummyComponent,
  },
]

const CurrentStepComponent: FC<StepProps> = ({ currentStep, ...props }) => {
  const CurrentComponent = useMemo(() => {
    return steps[currentStep]?.component
  }, [currentStep])

  if (!CurrentComponent) return <></>

  return <CurrentComponent currentStep={currentStep} {...props} />
}

const TeachersSignUpPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="my-10 flex justify-center">
      <StepperSidebar
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="mt-2 w-3/6">
        <CurrentStepComponent
          currentStep={currentStep}
          totalSteps={steps.length}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  )
}

export default TeachersSignUpPage
