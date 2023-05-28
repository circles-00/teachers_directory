import { type FC } from 'react'
import { TextFormField } from '@components'
import { type TFormFieldProps, TrashButton } from '@domains/sign-up'

interface AchievementProps {
  onRemove: (index: number) => void
  index: number
  numberOfQualifications: number
  title: TFormFieldProps
  description: TFormFieldProps
  grade: TFormFieldProps
}

export const SingleAchievement: FC<AchievementProps> = ({
  index,
  onRemove,
  numberOfQualifications,
  title,
  description,
  grade,
}) => {
  const isDisabled = numberOfQualifications === 1

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
      <TextFormField
        name={title.name}
        error={title.errors}
        placeholder="Title"
      />
      <TextFormField
        name={description.name}
        error={description.errors}
        placeholder="Description"
      />
      <TextFormField
        name={grade.name}
        error={grade.errors}
        placeholder="Grade"
      />
      <TrashButton index={index} onRemove={onRemove} isDisabled={isDisabled} />
    </div>
  )
}
