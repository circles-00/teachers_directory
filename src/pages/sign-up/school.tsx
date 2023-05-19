import {
  AccountDetailsQuestionnaire,
  AddressQuestionnaire,
  CurrentStepComponent,
  StepperSidebar
} from "@domains/sign-up";
import { useState } from "react";
import { type TeachersDirectoryPage } from "~/types/page";
import { EScreenId } from "@domains/screen";

const steps = [
  {
    title: 'Account details',
    component: AccountDetailsQuestionnaire,
  },
  {
    title: 'Address and information',
    component: AddressQuestionnaire,
  },
]

const School: TeachersDirectoryPage = () => {
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

School.pageType = 'PRIVATE'
School.screenId = EScreenId.SIGN_UP_SCHOOL

export default School
