import { type FC } from 'react'
import { SaveButton } from '@domains/sign-up/components/TeachersFlow/components/ActionButtons/components/SaveButton'
import { SkipButton } from '@domains/sign-up/components/TeachersFlow/components/ActionButtons/components/SkipButton'

interface IActionButtonsProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  saveDisabled?: boolean
  isSaveLoading?: boolean
}

export const ActionButtons: FC<IActionButtonsProps> = ({
  currentStep,
  setCurrentStep,
  saveDisabled = false,
  isSaveLoading = false,
}) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <SkipButton onClick={() => setCurrentStep(currentStep + 1)} />

      <SaveButton
        isLoading={isSaveLoading}
        disabled={saveDisabled}
        className="w-full md:w-52"
      />
    </div>
  )
}
