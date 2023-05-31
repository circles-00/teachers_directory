import { type FC, useState } from 'react'
import { Header, type StepProps, StepsHeader } from '@domains/sign-up'
import {
  AvailabilityTable,
  type TAvailabilityTable,
  UploadFiles,
} from './components'
import { InfoBox, RadioGroupFormField } from '@components'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { CommonDialog } from '@components/common/CommonDialog'
import { ActionButtons } from '@domains/sign-up'
import { FormProvider, useController, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import { api, formResolver } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'
import isEmpty from 'lodash.isempty'

interface IAvailabilityQuestionnaireProps extends StepProps {}

export const AvailabilityQuestionnaire: FC<IAvailabilityQuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data } = api.teachers.getTeacherAvailability.useQuery()

  const saveTeacherAvailabilityMutation =
    api.teachers.saveTeacherAvailability.useMutation({
      onSuccess: () => onNextStep({ totalSteps, setCurrentStep, currentStep }),
    })

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
    mode: 'onChange',
  })

  const availableNow = methods.watch('availableNow')
  const startDate = methods.watch('startDate')

  const handleOnDayClick = (day?: Date) => {
    methods.setValue('startDate', day?.toLocaleDateString() as string)
    setIsDialogOpen(false)
  }

  const onSubmit = (data: TSchema) => {
    let dataToSend = { ...data }

    if (data.availableNow && !isEmpty(data.startDate)) {
      dataToSend = {
        ...dataToSend,
        startDate: '',
      }
    }

    saveTeacherAvailabilityMutation.mutate(dataToSend)
  }

  const { field } = useController({
    name: 'availabilityTable',
    control: methods.control,
  })

  const { field: filesField } = useController({
    name: 'files',
    control: methods.control,
  })

  useUpdate(() => {
    if (data?.availability) {
      methods.reset(data.availability as unknown as TSchema)
      methods.trigger().catch(console.error)
    }
  }, [data?.availability])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
          <Header
            title={'Your Availability'}
            description={`Select any dates that are you are free for additional services (e.g. proof reading) or for teaching.`}
          />
          <AvailabilityTable
            initialValue={
              data?.availability?.availabilityTable as TAvailabilityTable
            }
            onChange={field.onChange}
          />
          <div className="mt-5">
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-bold">
                  Are you available for work now or in the future?
                </h3>
                <InfoBox
                  content={'Are you available for work now or in the future?'}
                />
              </div>

              <p className="text-sm">Some paragraph here</p>
            </div>
            <RadioGroupFormField<boolean | string, TSchema>
              name="availableNow"
              className="mt-4 w-full flex-col md:flex-row"
              options={[
                { value: true, label: 'I’m available now' },
                { value: false, label: 'I will be available later' },
              ]}
            />
          </div>
          {availableNow === false && (
            <div className="mt-5">
              <h3 className="text-lg font-bold">
                When will you be available in the future?
              </h3>

              {/* TODO: Abstract this clickable icon input as a common component */}
              <div className="mt-2 flex items-center justify-center md:w-1/3">
                <input
                  value={startDate as string}
                  placeholder="Select Date"
                  className="h-12 w-full rounded-md border-[1px] border-[#0000004D] p-2 py-6 focus:outline-slate-400"
                />
                <button
                  type="button"
                  className="ml-[-2rem]"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <CalendarIcon width={24} height={24} />
                </button>
              </div>

              <CommonDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              >
                <div className="flex justify-center">
                  <DayPicker
                    fromDate={new Date()}
                    mode="single"
                    modifiersStyles={{
                      selected: {
                        backgroundColor: '#108A00',
                      },
                    }}
                    selected={new Date(startDate ?? '')}
                    onSelect={handleOnDayClick}
                  />
                </div>
              </CommonDialog>
            </div>
          )}

          <UploadFiles
            initialValue={data?.availability?.files}
            onChange={filesField.onChange}
          />
          <ActionButtons
            isSaveLoading={saveTeacherAvailabilityMutation.isLoading}
            saveDisabled={
              !methods.formState.isDirty || !methods.formState.isValid
            }
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </form>
    </FormProvider>
  )
}
