import { type NextPage } from 'next'
import {
  LocationQuestionnaire,
  StepperSidebar,
  SubjectsQuestionnaire,
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
    component: DummyComponent,
  },
  {
    title: 'Your teaching life',
    component: DummyComponent,
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

const CurrentStepComponent: FC<{
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
}> = ({ currentStep, ...props }) => {
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
