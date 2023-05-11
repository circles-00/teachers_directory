import { type FC } from 'react'
import { ButtonOutlined } from '@components'
import { SaveButton } from '@domains/sign-up/components/TeachersFlow/components/ActionButtons/components/SaveButton'

interface IActionButtonsProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

export const ActionButtons: FC<IActionButtonsProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  const onNext = () => {
    if (currentStep >= totalSteps - 1) {
      return
    }

    setCurrentStep(currentStep + 1)
  }

  const onBack = () => {
    if (currentStep === 0) {
      return
    }

    setCurrentStep(currentStep - 1)
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <ButtonOutlined
        onClick={onBack}
        className="mr-auto mt-4 flex w-full items-center justify-center py-3 pl-3 text-primary md:mr-0 md:w-52"
      >
        Back
      </ButtonOutlined>
      <SaveButton className="w-full md:w-52" onClick={onNext} />
    </div>
  )
}
