import { type FC, useState } from 'react'
import {
  Header,
  SaveButton,
  type StepProps,
  StepsHeader,
} from '@domains/sign-up'
import { AvailabilityTable, UploadFiles } from './components'
import { CommonRadioGroup } from '@components'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { CommonDialog } from '@components/common/CommonDialog'
interface IAvailabilityQuestionnaireProps extends StepProps {}

export const AvailabilityQuestionnaire: FC<IAvailabilityQuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  const [availability, setAvailability] = useState<'now' | 'future' | null>(
    null
  )
  const [availabilityDate, setAvailabilityDate] = useState<Date>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOnDayClick = (day?: Date) => {
    setAvailabilityDate(day)
    setIsDialogOpen(false)
  }

  return (
    <div className="flex w-5/6 flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Your Availability'}
        description={`Select any dates that are you are free for additional services (e.g. proof reading) or for teaching.`}
      />
      <AvailabilityTable />
      <div className="mt-5">
        <h3 className="text-lg font-bold">
          Are you available for work now or in the future?
        </h3>
        <CommonRadioGroup<typeof availability>
          className="mt-4 w-full"
          options={[
            { value: 'now', label: 'I’m available now' },
            { value: 'future', label: 'I will be available later' },
          ]}
          value={availability}
          onChange={(value) => setAvailability(value)}
        />
      </div>
      {availability === 'future' && (
        <div className="mt-5">
          <h3 className="text-lg font-bold">
            When will you be available in the future?
          </h3>

          {/* TODO: Abstract this clickable icon input as a common component */}
          <div className="mt-2 flex w-1/3 items-center justify-center">
            <input
              value={availabilityDate?.toLocaleDateString()}
              placeholder="Select Date"
              className="h-12 w-full rounded-md border-[1px] border-[#0000004D] p-2 py-6 focus:outline-slate-400"
            />
            <button
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
                mode="single"
                modifiersStyles={{
                  selected: {
                    backgroundColor: '#108A00',
                  },
                }}
                selected={availabilityDate}
                onSelect={handleOnDayClick}
              />
            </div>
          </CommonDialog>
        </div>
      )}

      <UploadFiles />
      <SaveButton onClick={() => setCurrentStep(currentStep + 1)} />
    </div>
  )
}
