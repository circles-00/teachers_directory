import { type FC, useMemo, useState } from 'react'
import { Select, CommonRadioGroup, type SelectOption } from '@components'
import { filterItems } from '@domains/search'

const roles = filterItems[1]?.items.map((item) => ({
  value: item.title,
  id: item.value,
}))

const dates = [
  { value: 'Date #1' },
  { value: 'Date #2' },
  { value: 'Date #3' },
  { value: 'Date #4' },
  { value: 'Date #5' },
]

interface ExperienceQuestionnaireFormProps {}

export const ExperienceQuestionnaireForm: FC<
  ExperienceQuestionnaireFormProps
> = () => {
  const [teachingQualification, setTeachingQualification] = useState<
    boolean | null
  >(null)
  const [degree, setDegree] = useState<boolean | null>(null)
  const [examiner, setExaminer] = useState<boolean | null>(null)
  const [role, setRole] = useState<SelectOption | null>(null)

  const subCategories = useMemo(() => {
    const category = filterItems[1]?.items.find(
      (item) => item.value === role?.value
    )

    return category?.subItems?.map((item) => ({
      value: item.title,
      id: item.value,
    }))
  }, [role])

  return (
    <>
      <h2 className="mt-8 text-lg font-bold text-primary">
        About your position
      </h2>
      <div className="mt-4 w-11/12">
        <Select
          options={roles ?? []}
          placeholder="Type of role"
          onChange={(value) => setRole({ value })}
        />
      </div>
      {!!role && (
        <div className="mt-4 w-11/12">
          <Select
            options={subCategories ?? []}
            placeholder="Choose a sub-category"
          />
        </div>
      )}
      <hr className="my-8 w-11/12" />

      <h2 className="text-lg font-bold">
        How long have you been teaching? (optional)
      </h2>

      <div className="mt-4 w-11/12">
        <Select options={dates} placeholder="Select date" />
      </div>

      <h2 className="mt-4 text-lg font-bold">
        Do you have a teaching qualification? (optional)
      </h2>
      <CommonRadioGroup<typeof teachingQualification>
        className="mt-4"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
        value={teachingQualification}
        onChange={(value) => setTeachingQualification(value)}
      />

      <h2 className="mt-4 text-lg font-bold">
        Do you have a degree? (optional)
      </h2>
      <CommonRadioGroup<typeof teachingQualification>
        className="mt-4"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
        value={degree}
        onChange={(value) => setDegree(value)}
      />

      <h2 className="mt-4 text-lg font-bold">
        Are you currently an examiner? (optional)
      </h2>
      <CommonRadioGroup<typeof teachingQualification>
        className="mt-4"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
        value={examiner}
        onChange={(value) => setExaminer(value)}
      />
    </>
  )
}
