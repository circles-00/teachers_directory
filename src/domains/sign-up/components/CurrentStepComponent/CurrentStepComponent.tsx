import { type FC, useMemo } from 'react'
import { type StepProps } from '@domains/sign-up'

type Step = {
  title: string
  component: FC<StepProps>
}

interface CurrentStepComponentProps extends StepProps {
  steps: Step[]
}

export const CurrentStepComponent: FC<CurrentStepComponentProps> = ({
  currentStep,
  steps,
  ...props
}) => {
  const CurrentComponent = useMemo(() => {
    return steps[currentStep]?.component
  }, [currentStep, steps])

  if (!CurrentComponent) return <></>

  return <CurrentComponent currentStep={currentStep} {...props} />
}
