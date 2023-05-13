import { type FC } from 'react'
import { Header, StepsHeader, type StepProps } from '@domains/sign-up'
import { ExperienceQuestionnaireForm } from './components'
import { ActionButtons } from '@domains/sign-up'

interface IExperienceQuestionnaireProps extends StepProps {}

export const ExperienceQuestionnaire: FC<IExperienceQuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Tell us about your teaching life'}
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales'
        }
      />
      <ExperienceQuestionnaireForm />
      <div className="flex w-11/12">
        <ActionButtons
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalSteps={totalSteps}
        />
      </div>
    </div>
  )
}
