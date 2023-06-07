import { type FC } from 'react'
import { ButtonOutlined } from '../../../../../../../components'
import { Header } from '../../../../Header'
import { SingleQualification } from './SingleQualification'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { initialQualification } from '../initialData'
import { type TSchema } from '../validation'

interface IQualifications {
  title: string
  description: string
}

export const Qualifications: FC<IQualifications> = ({ title, description }) => {
  const methods = useFormContext<TSchema>()

  const { fields, append, remove } = useFieldArray({
    name: 'qualifications',
    control: methods.control,
  })

  const addQualification = () => {
    append(initialQualification)
  }

  const removeQualification = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col">
      <Header title={title} description={description} />
      <div className="mt-10">
        {fields.map((field, index, array) => {
          const fieldErrors = methods.formState.errors.qualifications?.[index]

          return (
            <SingleQualification
              university={{
                name: methods.register(
                  `qualifications.${index}.university` as const
                ).name,
                errors: fieldErrors?.university?.message,
              }}
              course={{
                name: methods.register(
                  `qualifications.${index}.course` as const
                ).name,
                errors: fieldErrors?.course?.message,
              }}
              grade={{
                name: methods.register(`qualifications.${index}.grade` as const)
                  .name,
              }}
              index={index}
              onRemove={removeQualification}
              key={field.id}
              numberOfQualifications={array.length}
            />
          )
        })}
      </div>
      <ButtonOutlined
        type="button"
        onClick={addQualification}
        className="mt-8 ml-auto w-28 text-primary"
      >
        Add Item
      </ButtonOutlined>
    </div>
  )
}
