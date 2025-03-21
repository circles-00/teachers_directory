import { type FC } from 'react'
import { Header, type StepProps, StepsHeader } from '@domains/sign-up'
import { Input } from '@components'
import { SaveButton } from '@domains/sign-up/components/TeachersFlow/components/ActionButtons/components/SaveButton'

interface IAddressQuestionnaireProps extends StepProps {}

export const AddressQuestionnaire: FC<IAddressQuestionnaireProps> = ({
  totalSteps,
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      <Header
        title={'Address and information'}
        description={`This address will be displayed, and we will use your postcode to calculate distances to potential teachers.`}
      />
      <div className="mt-8 flex flex-col gap-5">
        <Input placeholder={'School / Organisation name'} />
        <div className="flex flex-col gap-4 md:flex-row">
          <Input placeholder={'Address'} />
          <Input placeholder={'Post code'} />
          <button className="min-w-fit text-xs">Add manually</button>
        </div>
        <Input containerClassName="mt-4 md:mt-0" placeholder={'Phone number'} />
      </div>

      <div className="mt-4">
        <SaveButton className="w-36" position="left" label="Submit" />
      </div>
    </div>
  )
}
