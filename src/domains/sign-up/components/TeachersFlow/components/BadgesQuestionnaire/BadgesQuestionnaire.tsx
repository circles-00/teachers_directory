import { type FC } from 'react'
import { Header, type StepProps, StepsHeader } from '@domains/sign-up'
import { Badge } from '@domains/sign-up/components/TeachersFlow/components/BadgesQuestionnaire/components'
import { ActionButtons } from '@domains/sign-up'

const badges = [
  {
    title: 'Teaching qualification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
  },
  {
    title: 'Degree',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
  },
  {
    title: 'Examiner',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
  },
  {
    title: 'DBS',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
  },
]

interface IBadgesQuestionnaireProps extends StepProps {}

export const BadgesQuestionnaire: FC<IBadgesQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Would you like a badge next to your name?'}
        description={`If you are a teacher, you can have a verified tag for each of the following evidence you produce.`}
      />
      <div className="mt-4 flex flex-col gap-4">
        {badges.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>

      <ActionButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={totalSteps}
      />
    </div>
  )
}
