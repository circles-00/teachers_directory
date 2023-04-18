import { type NextPage } from 'next'
import { LocationQuestionnaire, StepperSidebar } from '@domains/sign-up'
import { type FC, useState } from 'react'

const DummyComponent = () => <p>In Progress...</p>

const steps = [
  {
    title: 'Where do you live?',
    component: LocationQuestionnaire,
  },
  {
    title: 'What subjects can you teach?',
    component: DummyComponent,
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

// TODO: Little bit hacky, try to find a better way to do this if there is some time
const CurrentStepComponent: FC<{
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
}> = ({ currentStep, totalSteps, setCurrentStep }) =>
  steps[currentStep]?.component({
    currentStep,
    totalSteps,
    setCurrentStep,
  }) ?? <></>

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
