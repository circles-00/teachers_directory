// TODO: Probably need to move this file to the root of the domain
export interface StepProps {
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
}

export type TFormFieldProps = {
  name: string
  errors?: string
}
