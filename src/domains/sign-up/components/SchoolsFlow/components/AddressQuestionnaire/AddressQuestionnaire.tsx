import { type FC } from 'react'
import {
  Header,
  SaveButton,
  type StepProps,
  StepsHeader,
} from '@domains/sign-up'
import { ButtonOutlined, Input } from '@components'

interface IAddressQuestionnaireProps extends StepProps {}

export const AddressQuestionnaire: FC<IAddressQuestionnaireProps> = ({
  totalSteps,
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="flex w-5/6 flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Address and information'}
        description={`This address will be displayed, and we will use your postcode to calculate distances to potential teachers.`}
      />
      <div className="mt-8 flex flex-col gap-5">
        <Input placeholder={'School / Organisation name'} />
        <div className="flex gap-4">
          <Input placeholder={'Address'} />
          <Input placeholder={'Post code'} />
          <ButtonOutlined className="w-72 px-2 text-primary">
            Add manually
          </ButtonOutlined>
        </div>
        <Input placeholder={'Phone number'} />
      </div>

      <div className="mt-4">
        <SaveButton className="w-36" position="left" label="Submit" />
      </div>
    </div>
  )
}
