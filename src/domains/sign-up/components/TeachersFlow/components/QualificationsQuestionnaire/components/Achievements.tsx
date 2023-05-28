import { type FC } from 'react'
import { Header } from '@domains/sign-up'
import { ButtonOutlined } from '@components'
import { SingleAchievement } from './SingleAchievement'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { type TSchema } from '../validation'
import { initialAchievement } from '../initialData'
interface IAchievementsProps {
  title: string
  description: string
}

export const Achievements: FC<IAchievementsProps> = ({
  title,
  description,
}) => {
  const methods = useFormContext<TSchema>()

  const { fields, append, remove } = useFieldArray({
    name: 'achievements',
    control: methods.control,
  })

  const addAchievement = () => {
    append(initialAchievement)
  }

  const removeAchievement = (index: number) => {
    remove(index)
  }

  return (
    <div>
      <Header title={title} description={description} />
      <div className="mt-10"></div>
      {fields.map((field, index, array) => {
        const fieldsErrors = methods.formState.errors.achievements?.[index]

        return (
          <SingleAchievement
            title={{
              name: methods.register(`achievements.${index}.title` as const)
                .name,
              errors: fieldsErrors?.title?.message,
            }}
            description={{
              name: methods.register(
                `achievements.${index}.description` as const
              ).name,
              errors: fieldsErrors?.description?.message,
            }}
            grade={{
              name: methods.register(`achievements.${index}.grade` as const)
                .name,
              errors: fieldsErrors?.grade?.message,
            }}
            onRemove={() => removeAchievement(index)}
            index={index}
            key={field.id}
            numberOfQualifications={fields.length}
          />
        )
      })}

      <ButtonOutlined
        type="button"
        onClick={addAchievement}
        className="mt-8 mr-auto w-28 text-primary"
      >
        Add Item
      </ButtonOutlined>
    </div>
  )
}
