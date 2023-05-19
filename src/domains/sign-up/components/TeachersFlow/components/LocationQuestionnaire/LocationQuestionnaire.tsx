import { useState, type FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AutoComplete, Input } from '@components'
import { StepsHeader } from '@domains/sign-up'
import { Header } from '../../../Header'
import { type StepProps } from '../../types'
import { ActionButtons } from '@domains/sign-up'
import { type TLibraries, useAutoCompletePlaces, useGoogleApi } from '@hooks'
interface ILocationQuestionnaireProps extends StepProps {}

const libraries: TLibraries = ['places']

export const LocationQuestionnaire: FC<ILocationQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  const [isManualLocation, setIsManualLocation] = useState(false)

  const { isLoaded } = useGoogleApi({ libraries })

  const { data, value, handleInput, handleSelect } = useAutoCompletePlaces({
    isLoaded,
  })

  return (
    <div className="flex flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title="Where do you live?"
        description={`This won't be displayed but we use your postcode to calculate distances to \npotential schools. Also, if you add your mobile number, we can text you if you have \na job application.`}
      />
      <div className="flex w-5/6 flex-col">
        <AutoComplete
          options={data.map((item) => ({ value: item.description }))}
          isAsync
          onAsyncSearch={handleInput}
          asyncValue={value}
          Icon={MagnifyingGlassIcon}
          placeholder="Location or Postcode"
          containerClassName="mt-6"
          asyncOnSelect={handleSelect}
          asyncSelected={{ value }}
        />
        <button
          onClick={() => setIsManualLocation(!isManualLocation)}
          className="mt-4 ml-auto"
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
        <ActionButtons
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalSteps={totalSteps}
        />
      </div>
    </div>
  )
}
