import { type FC } from 'react'
import { LinearProgressBar, RoundedContainer } from '@components'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { api } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'

interface IStepperSidebarProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  steps: Array<{ title: string }>
}

export const StepperSidebar: FC<IStepperSidebarProps> = ({
  currentStep,
  setCurrentStep,
  steps,
}) => {
  const { data, refetch } =
    api.teachers.getTeacherProfileCompletionProgress.useQuery()

  useUpdate(() => {
    refetch().catch(console.error)
  }, [currentStep])

  const isCurrentStep = (index: number) => index === currentStep

  return (
    <div className="w-94 mr-8 hidden md:block">
      <RoundedContainer className="p-4 md:mx-0 md:w-full">
        {steps.map((item, index) => (
          <button
            key={index}
            className={`mt-1 ${
              !isCurrentStep(index) ? 'hover:text-primary' : ''
            } flex justify-between rounded-md px-3 py-2 text-start text-sm ${
              isCurrentStep(index) ? 'bg-primaryTransparent-16' : ''
            }`}
            onClick={() => setCurrentStep(index)}
            disabled={isCurrentStep(index)}
          >
            <p>{item.title}</p>
            <ChevronRightIcon width={24} height={24} className="stroke-4" />
          </button>
        ))}
      </RoundedContainer>
      <RoundedContainer className="mt-4 p-4 md:w-full">
        <LinearProgressBar progress={data?.progress ?? 0} />
        <h1 className="mt-2 font-bold">Almost there</h1>
        <p className="text-xs">
          Your profile is{' '}
          <span className="text-primary">{data?.progress}%</span> ready,
          continue with <br /> the progress
        </p>
      </RoundedContainer>
    </div>
  )
}
