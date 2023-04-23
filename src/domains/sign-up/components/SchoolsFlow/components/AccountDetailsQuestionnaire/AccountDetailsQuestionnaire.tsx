import { type FC, useState } from 'react'
import {
  AccountDetailsForm,
  Header,
  NextSteps,
  SaveButton,
  type StepProps,
  StepsHeader,
} from '@domains/sign-up'

interface IAccountDetailsQuestionnaireProps extends StepProps {}

export const AccountDetailsQuestionnaire: FC<
  IAccountDetailsQuestionnaireProps
> = ({ currentStep, setCurrentStep, totalSteps }) => {
  const [termsAccepted, setTermsAccepted] = useState(false)

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="mb-8 flex flex-col md:mb-0 md:w-5/6">
        <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
        <Header
          title={'Account details'}
          description={`After the sign up process, we will send you a link to your email address to verify your account.`}
        />
        <AccountDetailsForm
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
        />
        <SaveButton
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!termsAccepted}
        />
      </div>
      <NextSteps />
    </div>
  )
}
