import { useState, type FC } from 'react'
import { type StepProps } from '../../types'
import { Header, StepsHeader } from '@domains/sign-up'
import { Qualification } from './Qualification'
import { ButtonContained, ButtonOutlined } from '@components'

// !@ Main component
interface IQualificationsQuestionnaireProps extends StepProps {}

export const QualificationsQuestionnaire: FC<
  IQualificationsQuestionnaireProps
> = ({ currentStep, setCurrentStep, totalSteps }) => {
  return (
    <div className="flex w-5/6 flex-col">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Qualifications
        title="Your qualifications (Optional)"
        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales`}
      />
      <div className="mt-8">
        <Qualifications
          title="Other relevant achievements (optional)"
          description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales`}
          custom
        />
      </div>
      <ButtonContained
        onClick={() => setCurrentStep(currentStep + 1)}
        className="ml-auto mt-4 w-52 py-3 text-white"
      >
        Save and continue
      </ButtonContained>
    </div>
  )
}

// !@ Sub components, move when getting too messy

interface IQualifications {
  title: string
  description: string
  custom?: boolean
}

const Qualifications: FC<IQualifications> = ({
  title,
  description,
  custom,
}) => {
  const [qualificationForms, setQualificationForms] = useState([
    {
      university: '',
      course: '',
      grade: '',
    },
  ])

  const addQualification = () => {
    setQualificationForms([
      ...qualificationForms,
      { university: '', course: '', grade: '' },
    ])
  }

  const removeQualification = (index: number) => {
    const newQualifications = [...qualificationForms]
    newQualifications.splice(index, 1)
    setQualificationForms(newQualifications)
  }

  return (
    <div>
      <Header title={title} description={description} />
      <div className="mt-10">
        {qualificationForms.map((subject, index, array) => (
          <Qualification
            index={index}
            onRemove={removeQualification}
            key={index}
            numberOfQualifications={array.length}
            custom={custom}
          />
        ))}
      </div>
      <ButtonOutlined
        onClick={addQualification}
        className="mt-8 mr-auto w-28 text-primary"
      >
        Add Item
      </ButtonOutlined>
    </div>
  )
}
