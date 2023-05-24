interface IOnNextStepProps {
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
}

export const onNextStep = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}: IOnNextStepProps) => {
  if (currentStep >= totalSteps - 1) {
    return
  }

  setCurrentStep(currentStep + 1)
}
