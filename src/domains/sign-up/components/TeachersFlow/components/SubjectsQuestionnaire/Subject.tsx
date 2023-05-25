import { type FC } from 'react'
import { AutoCompleteFormField, SelectFormField } from '@components'
import { TrashButton } from '@domains/sign-up'

const subjects = [
  {
    value: 'Maths',
  },
  {
    value: 'English',
  },
  {
    value: 'Science',
  },
  {
    value: 'History',
  },
  {
    value: 'Geography',
  },
]

const levels = [
  {
    value: 'Early Years (0-5 yrs)',
  },
  {
    value: 'Primary (5-11 yrs)',
  },
  { value: 'Secondary (11-18 yrs)' },
  { value: 'Higher (18+ yrs)' },
]

const examBoards = [
  {
    value: 'AQA',
  },
  {
    value: 'Edexcel',
  },
  {
    value: 'OCR',
  },
  {
    value: 'WJEC',
  },
  {
    value: 'CCEA',
  },
  {
    value: 'Other',
  },
]

type TFormFieldProps = {
  name: string
  errors?: string
}

interface SubjectProps {
  onRemove: (index: number) => void
  index: number
  numberOfSubjects: number
  subjectName: TFormFieldProps
  subjectLevel: TFormFieldProps
  subjectExamBoard: TFormFieldProps
}

export const Subject: FC<SubjectProps> = ({
  index,
  onRemove,
  numberOfSubjects,
  subjectName,
  subjectLevel,
  subjectExamBoard,
}) => {
  const isDisabled = numberOfSubjects === 1

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
      <AutoCompleteFormField
        name={subjectName.name}
        label="Subject Name"
        options={subjects}
      />
      <SelectFormField<string>
        name={subjectLevel?.name}
        label="Highest achieved level"
        options={levels}
      />
      <SelectFormField<string>
        name={subjectExamBoard?.name}
        label="Exam board (optional)"
        options={examBoards}
      />
      <TrashButton
        onRemove={() => onRemove(index)}
        index={index}
        isDisabled={isDisabled}
      />
    </div>
  )
}
