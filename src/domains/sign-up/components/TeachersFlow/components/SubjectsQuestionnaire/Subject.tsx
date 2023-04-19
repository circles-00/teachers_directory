import { TrashIcon } from '@components'
import { type FC } from 'react'
import { Select } from '@components'

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
    <div className="mt-4 flex items-center justify-between gap-2">
      <Select options={subjects} />
      <Select options={levels} />
      <Select options={examBoards} />
      <button
        disabled={isDisabled}
        onClick={() => onRemove(index)}
        className={`min-w-fit ${isDisabled ? 'cursor-not-allowed' : ''}`}
      >
        <TrashIcon disabled={isDisabled} fillColor={isDisabled ? '' : 'red'} />
      </button>
    </div>
  )
}
