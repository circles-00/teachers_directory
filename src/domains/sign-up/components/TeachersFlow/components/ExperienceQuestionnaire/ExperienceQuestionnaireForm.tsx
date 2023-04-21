import { type FC, useState } from 'react'
import { Select, CommonRadioGroup } from '@components'

const roles = [
  { value: 'Role #1' },
  { value: 'Role #2' },
  { value: 'Role #3' },
  { value: 'Role #4' },
  { value: 'Role #5' },
]

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

  return (
    <>
      <h2 className="mt-8 text-lg font-bold text-primary">About your role</h2>
      <div className="mt-4 w-11/12">
        <Select options={roles} placeholder="Type of role" />
      </div>

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
