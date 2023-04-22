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
}) => {
  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Address and information'}
        description={`This address will be displayed, and we will use your postcode to calculate distances to potential teachers.`}
      />
      <div className="mt-8 flex flex-col gap-5">
        <Input placeholder={'School / Organisation name'} />
        <div className="flex flex-col gap-4 md:flex-row">
          <Input placeholder={'Address'} />
          <Input placeholder={'Post code'} />
          <ButtonOutlined className="px-2 text-primary md:w-72">
            Add manually
          </ButtonOutlined>
        </div>
        <Input containerClassName="mt-4 md:mt-0" placeholder={'Phone number'} />
      </div>

      <div className="mt-4">
        <SaveButton className="w-36" position="left" label="Submit" />
      </div>
    </div>
  )
}
