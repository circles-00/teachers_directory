import { type FC } from 'react'
import { Header, StepsHeader, type StepProps } from '@domains/sign-up'
import { ButtonContained } from '@components'
import { ExperienceQuestionnaireForm } from './ExperienceQuestionnaireForm'

interface IExperienceQuestionnaireProps extends StepProps {}

export const ExperienceQuestionnaire: FC<IExperienceQuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  return (
    <div className="flex w-5/6 flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Tell us about your teaching life'}
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales'
        }
      />
      <ExperienceQuestionnaireForm />
      <div className="flex w-11/12">
        <ButtonContained
          onClick={() => setCurrentStep(currentStep + 1)}
          className="ml-auto mt-10 w-52 py-3 text-white"
        >
          Save and continue
        </ButtonContained>
      </div>
    </div>
  )
}
