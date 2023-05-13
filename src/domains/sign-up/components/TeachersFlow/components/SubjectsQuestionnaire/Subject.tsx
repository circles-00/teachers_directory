import { type FC } from 'react'
import { AutoComplete, Select } from '@components'
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
    value: 'KS1 5-7 yrs',
  },
  {
    value: 'KS2 7-11 yrs',
  },
  { value: 'KS3 11-14 yrs' },
  { value: 'KS4 14-16 yrs' },
  { value: 'KS5 16-18 yrs' },
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

interface SubjectProps {
  onRemove: (index: number) => void
  index: number
  numberOfSubjects: number
}

export const Subject: FC<SubjectProps> = ({
  index,
  onRemove,
  numberOfSubjects,
}) => {
  const isDisabled = numberOfSubjects === 1

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
      <AutoComplete label="Subject Name" options={subjects} />
      <Select label="Highest achieved Level" options={levels} />
      <Select label="Exam board" options={examBoards} />
      <TrashButton onRemove={onRemove} index={index} isDisabled={isDisabled} />
    </div>
  )
}
