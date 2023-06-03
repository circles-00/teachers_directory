import { type FC } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'

interface IStepsHeaderProps {
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
}

export const StepsHeader: FC<IStepsHeaderProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {currentStep !== 0 && (
        <div
          onClick={() => setCurrentStep(currentStep - 1)}
          className="flex cursor-pointer items-center gap-1 text-xs text-primary"
        >
          <ArrowLongLeftIcon className="h-5 w-5 fill-primary" /> Back
        </div>
      )}
      <p className="text-sm text-primary">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  )
}
