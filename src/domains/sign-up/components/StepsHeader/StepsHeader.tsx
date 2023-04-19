import { type FC } from 'react'

interface IStepsHeaderProps {
  currentStep: number
  totalSteps: number
}

export const StepsHeader: FC<IStepsHeaderProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <p className="text-sm text-primary">
      Step {currentStep + 1} of {totalSteps}
    </p>
  )
}
