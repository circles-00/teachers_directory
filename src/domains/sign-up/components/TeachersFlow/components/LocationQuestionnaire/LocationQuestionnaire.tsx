import { useState, type FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ButtonContained, IconInput, Input } from '@components'

interface ILocationQuestionnaireProps {
  currentStep: number
  totalSteps: number
  setCurrentStep: (step: number) => void
}

export const LocationQuestionnaire: FC<ILocationQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  const [isManualLocation, setIsManualLocation] = useState(false)

  return (
    <div className="flex flex-col">
      <p className="text-sm text-primary">
        Step {currentStep + 1} of {totalSteps}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-primary">
        Where do you live?
      </h1>
      <p>
        This won&apos;t be displayed but we use your postcode to calculate
        distances to <br /> potential schools. Also, if you add your mobile
        number, we can text you if you have <br /> a job application.
      </p>
      <div className="flex w-5/6 flex-col">
        <IconInput
          className="mt-6"
          iconClassName="top-9 right-3"
          Icon={MagnifyingGlassIcon}
          placeholder="Location or Postcode"
        />
        <button
          onClick={() => setIsManualLocation(!isManualLocation)}
          className="mt-4 ml-auto text-primary"
        >
          {!isManualLocation ? 'Add manually' : 'Hide'}
        </button>

        {isManualLocation && (
          <div className="mt-2 flex flex-col gap-4">
            <Input className="py-6" placeholder="Street address" />
            <Input className="py-6" placeholder="Street address (optional)" />
            <Input className="py-6" placeholder="City/Town" />
            <Input className="py-6" placeholder="Postcode" />
          </div>
        )}
        <ButtonContained
          onClick={() => setCurrentStep(currentStep + 1)}
          className="ml-auto mt-4 w-52 py-3 text-white"
        >
          Save and continue
        </ButtonContained>
      </div>
    </div>
  )
}
