import { useState, type FC } from 'react'
import { StepsHeader, Header, Subject, SaveButton } from '@domains/sign-up'
import { ButtonOutlined } from '@components'
import { type StepProps } from '../../types'

interface ISubjectsQuestionnaireProps extends StepProps {}

export const SubjectsQuestionnaire: FC<ISubjectsQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  const [subjectForms, setSubjectForms] = useState([
    {
      subject: '',
      level: '',
      examBoard: '',
    },
  ])

  const addSubject = () => {
    setSubjectForms([
      ...subjectForms,
      { subject: '', level: '', examBoard: '' },
    ])
  }

  const removeSubject = (index: number) => {
    const newSubjects = [...subjectForms]
    newSubjects.splice(index, 1)
    setSubjectForms(newSubjects)
  }

  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
      <Header
        title="What subject can you teach?"
        description={`Add the subject(s) you teach. You must select one or two main subjects that will appear on your profile.`}
      />
      {subjectForms.map((subject, index, array) => (
        <Subject
          index={index}
          onRemove={removeSubject}
          key={index}
          numberOfSubjects={array.length}
        />
      ))}
      <ButtonOutlined
        onClick={addSubject}
        className="mt-8 mr-auto w-28 text-primary"
      >
        Add Item
      </ButtonOutlined>

      <SaveButton onClick={() => setCurrentStep(currentStep + 1)} />
    </div>
  )
}
