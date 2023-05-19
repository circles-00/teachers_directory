import { type FC } from 'react'
import { AutoComplete, Input, Select } from '@components'
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
          <AutoComplete label="University" options={subjects} />
          <Select label="Course" options={levels} />
          <Select label="Grade" options={examBoards} />
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
