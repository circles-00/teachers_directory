import { type FC, useState } from 'react'
import {
  ActionButtons,
  Header,
  type StepProps,
  StepsHeader,
  TrashButton,
} from '@domains/sign-up'
import { ButtonOutlined, Input } from '@components'
import { generateArray } from '@utils'

interface IOtherServiceProps {
  onRemove: (index: number) => void
  index: number
  isDisabled: boolean
}

const OtherService: FC<IOtherServiceProps> = ({
  index,
  onRemove,
  isDisabled,
}) => (
  <div className="mt-6 flex flex-col gap-3 md:flex-row">
    <Input placeholder="Service I offer" containerClassName="md:w-1/3" />
    <Input placeholder="Description" />
    <div className="flex items-center md:ml-4">
      <TrashButton onRemove={onRemove} index={index} isDisabled={isDisabled} />
    </div>
  </div>
)

interface IOtherServicesQuestionnaireProps extends StepProps {}

export const OtherServicesQuestionnaire: FC<
  IOtherServicesQuestionnaireProps
> = ({ currentStep, setCurrentStep, totalSteps }) => {
  const [subjects, setSubjects] = useState(1)

  const onRemove = () => {
    setSubjects(subjects - 1)
  }

  const onAdd = () => {
    setSubjects(subjects + 1)
  }

  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title={'Other services'}
        description={`Add the subject(s) you teach. You must select one or two main subjects that will appear on your profile`}
      />

      {generateArray(subjects).map((_, index) => (
        <OtherService
          key={index}
          index={index}
          isDisabled={subjects === 1}
          onRemove={onRemove}
        />
      ))}

      <ButtonOutlined
        onClick={onAdd}
        className="mt-8 mr-auto w-28 text-primary"
      >
        Add Item
      </ButtonOutlined>

      <ActionButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  )
}
