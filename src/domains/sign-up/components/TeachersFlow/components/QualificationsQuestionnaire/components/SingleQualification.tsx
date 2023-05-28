import { type FC } from 'react'
import {
  AutoComplete,
  AutoCompleteFormField,
  Input,
  Select,
  SelectFormField,
  TextFormField,
} from '@components'
import { type TFormFieldProps, TrashButton } from '@domains/sign-up'
import { data } from '@domains/sign-up/components/TeachersFlow/components/QualificationsQuestionnaire/components/data'

interface QualificationProps {
  onRemove: (index: number) => void
  index: number
  numberOfQualifications: number
  university: TFormFieldProps
  course: TFormFieldProps
  grade: TFormFieldProps
}

export const SingleQualification: FC<QualificationProps> = ({
  index,
  onRemove,
  numberOfQualifications,
  university,
  course,
  grade,
}) => {
  const isDisabled = numberOfQualifications === 1

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
      <AutoCompleteFormField
        containerClassName="self-start"
        name={university.name}
        label="University"
        options={data.universities}
      />
      <TextFormField
        name={course.name}
        error={course.errors}
        className="py-6"
        containerClassName="mt-1"
        placeholder="Course"
      />
      <SelectFormField<string>
        containerClassName="self-start"
        name={grade.name}
        label="Grade"
        options={data.grades}
      />
      <TrashButton
        className="self-center"
        index={index}
        onRemove={onRemove}
        isDisabled={isDisabled}
      />
    </div>
  )
}
