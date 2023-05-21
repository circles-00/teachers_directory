import { useState, type FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AutoCompleteFormField, TextFormField } from '@components'
import { StepsHeader } from '@domains/sign-up'
import { Header } from '../../../Header'
import { type StepProps } from '../../types'
import { ActionButtons } from '@domains/sign-up'
import { type TLibraries, useAutoCompletePlaces, useGoogleApi } from '@hooks'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { formResolver } from '@utils'
import { ELocationType } from '@shared'
import isEmpty from 'lodash.isempty'

interface ILocationQuestionnaireProps extends StepProps {}

const libraries: TLibraries = ['places']

const schema = z
  .object({
    googleLocation: z
      .object({
        value: z.string().optional(),
      })
      .optional(),
    streetAddress: z.string().optional(),
    secondAddress: z.string().optional(),
    city: z.string().optional(),
    postCode: z.string().optional(),
    type: ELocationType.optional(),
  })
  .partial()
  .refine((data) => {
    if (
      !isEmpty(data.streetAddress) &&
      !isEmpty(data.city) &&
      !isEmpty(data.postCode)
    ) {
      data.type = 'MANUAL'
      return true
    } else {
      data.type = 'GOOGLE'
    }

    return !isEmpty(data.googleLocation?.value)
  })

type TSchema = z.infer<typeof schema>

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

  const methods = useForm<TSchema>({
    resolver: formResolver(schema),
    defaultValues: {
      googleLocation: {
        value: '',
      },
      streetAddress: '',
      secondAddress: '',
      city: '',
      postCode: '',
    },
  })

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
        <Header
          title="Where do you live?"
          description={`This won't be displayed but we use your postcode to calculate distances to \npotential schools. Also, if you add your mobile number, we can text you if you have \na job application.`}
        />
        <div className="flex w-5/6 flex-col">
          <AutoCompleteFormField
            name="googleLocation"
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
              <TextFormField<TSchema>
                name="streetAddress"
                className="py-6"
                placeholder="Street address"
              />
              <TextFormField<TSchema>
                name="secondAddress"
                className="py-6"
                placeholder="Street address (optional)"
              />
              <TextFormField<TSchema>
                name="city"
                className="py-6"
                placeholder="City/Town"
              />
              <TextFormField<TSchema>
                name="postCode"
                className="py-6"
                placeholder="Postcode"
              />
            </div>
          )}
          <ActionButtons
            showBackButton={currentStep > 0}
            saveDisabled={!methods.formState.isValid}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            totalSteps={totalSteps}
          />
        </div>
      </div>
    </FormProvider>
  )
}
