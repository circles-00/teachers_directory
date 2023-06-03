import { useState, type FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AutoComplete, TextFormField } from '@components'
import { StepsHeader } from '@domains/sign-up'
import { Header } from '../../../Header'
import { type StepProps } from '../../types'
import { ActionButtons } from '@domains/sign-up'
import { type TLibraries, useAutoCompletePlaces, useGoogleApi } from '@hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { api, excludeKeysFromObject, formResolver } from '@utils'
import { type TSchema, validationSchema } from './validation'
import { useUpdate } from '@rounik/react-custom-hooks'
import isEmpty from 'lodash.isempty'
import { every } from 'lodash'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'

interface ILocationQuestionnaireProps extends StepProps {}

const libraries: TLibraries = ['places']

export const LocationQuestionnaire: FC<ILocationQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  const [isManualLocation, setIsManualLocation] = useState(false)

  const { isLoaded } = useGoogleApi({ libraries })

  const teacherMutation = api.teachers.saveLocation.useMutation({
    onSuccess: () => onNextStep({ currentStep, setCurrentStep, totalSteps }),
  })

  const { data: teacherLocation } = api.teachers.getLocation.useQuery()

  const {
    data,
    coordinates,
    value,
    handleInput,
    handleSelect,
    addressComponents,
  } = useAutoCompletePlaces({
    isLoaded,
  })

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
    mode: 'onChange',
  })

  useUpdate(() => {
    const prePropulateData = !every(addressComponents, isEmpty)
      ? addressComponents
      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        excludeKeysFromObject(teacherLocation, ['teacherId', 'id'])

    if (!every(prePropulateData, isEmpty)) {
      methods.reset({
        streetAddress: prePropulateData?.streetAddress,
        city: prePropulateData?.city,
        postCode: prePropulateData?.postCode,
      })
      methods.trigger().catch(console.error)
      setIsManualLocation(true)
    }
  }, [addressComponents, teacherLocation])

  const onSubmit = (formData: TSchema) => {
    teacherMutation.mutate({ ...formData, ...coordinates })
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <div className="flex flex-col">
          <StepsHeader
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          <Header
            title="Where you live?"
            description={`This won't be displayed but we use your postcode to calculate distances to \npotential schools. Also, if you add your mobile number, we can text you if you have \na job application.`}
          />
          <div className="flex flex-col md:w-5/6">
            <AutoComplete
              options={data.map((item) => ({ value: item.description }))}
              isAsync
              onAsyncSearch={handleInput}
              asyncValue={value}
              Icon={MagnifyingGlassIcon}
              placeholder="Address or Postcode"
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
              isSaveLoading={teacherMutation.isLoading}
              saveDisabled={
                (!methods.formState.isDirty && !isManualLocation) ||
                !methods.formState.isValid
              }
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </FormProvider>
    </form>
  )
}
