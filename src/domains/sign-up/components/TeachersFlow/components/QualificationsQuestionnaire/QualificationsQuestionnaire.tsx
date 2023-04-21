import { type FC } from 'react'
import { type StepProps } from '../../types'
import { SaveButton, StepsHeader } from '@domains/sign-up'
import { Qualifications } from './components'

interface IQualificationsQuestionnaireProps extends StepProps {}

export const QualificationsQuestionnaire: FC<
  IQualificationsQuestionnaireProps
> = ({ currentStep, setCurrentStep, totalSteps }) => {
  return (
    <div className="flex w-5/6 flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Qualifications
        title="Your qualifications (Optional)"
        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales`}
      />
      <div className="mt-8">
        <Qualifications
          title="Other relevant achievements (optional)"
          description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales`}
          custom
        />
      </div>
      <SaveButton onClick={() => setCurrentStep(currentStep + 1)} />
    </div>
  )
}
