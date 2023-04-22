import { Input, TrashIcon } from '@components'
import { type FC } from 'react'
import { Select } from '@components'
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

interface QualificationProps {
  onRemove: (index: number) => void
  index: number
  numberOfQualifications: number
  custom?: boolean
}

export const Qualification: FC<QualificationProps> = ({
  index,
  onRemove,
  numberOfQualifications,
  custom,
}) => {
  const isDisabled = numberOfQualifications === 1

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
      {!custom && (
        <>
          <Select options={subjects} />
          <Select options={levels} />
          <Select options={examBoards} />
        </>
      )}
      {custom && (
        <>
          <Input placeholder="Title" />
          <Input placeholder="Description" />
          <Input placeholder="Grade" />
        </>
      )}
      <TrashButton index={index} onRemove={onRemove} isDisabled={isDisabled} />
    </div>
  )
}
