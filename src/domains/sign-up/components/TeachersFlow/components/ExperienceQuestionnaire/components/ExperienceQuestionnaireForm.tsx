import { type FC, useMemo } from 'react'
import {
  SelectFormField,
  RadioGroupFormField,
  HorizontalSelectFormField,
} from '@components'
import { filterItems } from '@domains/search'
import { useFormContext } from 'react-hook-form'
import { type TSchema } from '../validation'
import { useUpdate } from '@rounik/react-custom-hooks'
import { examBoards } from '@domains/sign-up'
import { teachingTimeOptions } from '@domains/sign-up/components/TeachersFlow/components/ExperienceQuestionnaire/data'

const roles = filterItems[1]?.children?.map((item) => ({
  value: item.label ?? '',
  id: item.label ?? '',
}))

interface ExperienceQuestionnaireFormProps {}

export const ExperienceQuestionnaireForm: FC<
  ExperienceQuestionnaireFormProps
> = () => {
  const methods = useFormContext<TSchema>()

  const role = methods.watch('role')
  const memoizedRole = useMemo(() => role, [role])

  const examiner = methods.watch('examiner')

  const subCategories = useMemo(() => {
    const category = filterItems[1]?.children?.find(
      (item) => item.label === memoizedRole
    )

    return category?.children?.map((item) => ({
      value: item.label ?? '',
      id: item.label ?? '',
    }))
  }, [memoizedRole])

  useUpdate(() => {
    if (subCategories && methods.formState.isDirty) {
      methods.setValue('subRole', subCategories[0]?.value as string)
    }
  }, [memoizedRole, subCategories, methods.formState.isDirty])

  return (
    <>
      <h2 className="mt-8 text-lg font-bold text-primary">
        About your position
      </h2>
      <div className="mt-4 w-11/12">
        <SelectFormField<TSchema>
          name="role"
          options={roles ?? []}
          placeholder="Type of role"
        />
      </div>
      {!!role && (
        <div className="mt-4 w-11/12">
          <SelectFormField<TSchema>
            name="subRole"
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
        <SelectFormField<TSchema>
          options={teachingTimeOptions}
          name="teachingTime"
          placeholder="Select date"
        />
      </div>

      <h2 className="mt-4 text-lg font-bold">
        Do you have a teaching qualification? (optional)
      </h2>
      <RadioGroupFormField<boolean, TSchema>
        name="qualification"
        className="mt-4"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
      />

      <h2 className="mt-4 text-lg font-bold">
        Do you have a degree? (optional)
      </h2>
      <RadioGroupFormField<boolean, TSchema>
        name="degree"
        className="mt-4"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
      />

      <h2 className="mt-4 text-lg font-bold">
        Have you been an examiner last 3 years? (optional)
      </h2>
      <RadioGroupFormField<boolean, TSchema>
        name="examiner"
        className="mt-4"
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
      />
      {!!examiner && (
        <div className="mt-3">
          <p className="text-md text-primary">
            If you are an examiner, please add which exam boards you are
            familiar with
          </p>
          <HorizontalSelectFormField<TSchema>
            name="examBoard"
            options={examBoards.map((el) => el.value)}
          />
        </div>
      )}
    </>
  )
}
