import { type FC } from 'react'
import { AutoCompleteFormField, SelectFormField } from '@components'
import { type TFormFieldProps, TrashButton } from '@domains/sign-up'
import { subjects } from './data'

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

// TODO: Move to another file
export const examBoards = [
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

interface SubjectProps {
  onRemove: (index: number) => void
  index: number
  numberOfSubjects: number
  subjectName: TFormFieldProps
  subjectLevel: TFormFieldProps
  subjectExamBoard: TFormFieldProps
  isMainSubject: TFormFieldProps
}

export const Subject: FC<SubjectProps> = ({
  index,
  onRemove,
  numberOfSubjects,
  subjectName,
  subjectLevel,
  subjectExamBoard,
  isMainSubject,
}) => {
  const isDisabled = numberOfSubjects === 1

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
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
      <SelectFormField<string>
        name={isMainSubject.name}
        label="Main subject you teach?"
        options={[{ value: 'Yes' }, { value: 'No' }]} // Look for a workaround in SubjectsQuestionnaire.tsx
      />
      <TrashButton
        onRemove={() => onRemove(index)}
        index={index}
        isDisabled={isDisabled}
      />
    </div>
  )
}
