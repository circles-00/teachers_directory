import { type FC, useState } from 'react'
import {
  ActionButtons,
  Header,
  type StepProps,
  StepsHeader,
  type TFormFieldProps,
  TrashButton,
} from '@domains/sign-up'
import { ButtonOutlined, Input, TextFormField } from '@components'
import { api, formResolver } from '@utils'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'
import { useUpdate } from '@rounik/react-custom-hooks'

interface IOtherServiceProps {
  onRemove: (index: number) => void
  index: number
  isDisabled: boolean
  title: TFormFieldProps
  description: TFormFieldProps
}

const OtherService: FC<IOtherServiceProps> = ({
  index,
  onRemove,
  isDisabled,
  title,
  description,
}) => (
  <div className="mt-6 flex flex-col gap-3 md:flex-row">
    <TextFormField
      name={title.name}
      error={title.errors}
      placeholder="Service I offer"
      containerClassName="md:w-1/3"
    />
    <TextFormField
      name={description.name}
      error={description.errors}
      placeholder="Description"
    />
    <div className="flex items-center md:ml-4">
      <TrashButton onRemove={onRemove} index={index} isDisabled={isDisabled} />
    </div>
  </div>
)

interface IOtherServicesQuestionnaireProps extends StepProps {}

export const OtherServicesQuestionnaire: FC<
  IOtherServicesQuestionnaireProps
> = ({ currentStep, setCurrentStep, totalSteps }) => {
  const initialService = {
    title: '',
    description: '',
  }

  const { data } = api.teachers.getTeacherOtherServices.useQuery()

  const saveTeacherOtherServicesMutation =
    api.teachers.saveTeacherOtherServices.useMutation({
      onSuccess: () => onNextStep({ currentStep, setCurrentStep, totalSteps }),
    })

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
    mode: 'onChange',
    defaultValues: { otherServices: [initialService] },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'otherServices',
    control: methods.control,
  })

  const onRemove = (index: number) => {
    remove(index)
  }

  const onAdd = () => {
    append(initialService)
  }

  const onSubmit = (data: TSchema) => {
    saveTeacherOtherServicesMutation.mutate(data)
  }

  useUpdate(() => {
    if (data?.otherServices && data?.otherServices.length > 0) {
      methods.reset({
        otherServices: data?.otherServices,
      })

      methods.trigger().catch(console.error)
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:w-5/6">
          <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
          <Header
            title={'Other services'}
            description={`Add the subject(s) you teach. You must select one or two main subjects that will appear on your profile`}
          />

          {fields.map((field, index) => {
            const fieldsErrors =
              methods.formState.errors?.otherServices?.[index]

            return (
              <OtherService
                title={{
                  name: methods.register(`otherServices.${index}.title`)?.name,
                  errors: fieldsErrors?.title?.message,
                }}
                description={{
                  name: methods.register(`otherServices.${index}.description`)
                    ?.name,
                  errors: fieldsErrors?.description?.message,
                }}
                key={field.id}
                index={index}
                isDisabled={fields.length === 1}
                onRemove={() => onRemove(index)}
              />
            )
          })}

          <ButtonOutlined
            onClick={onAdd}
            className="mt-8 mr-auto w-28 text-primary"
          >
            Add Item
          </ButtonOutlined>

          <ActionButtons
            saveDisabled={
              !methods.formState.isDirty || !methods.formState.isValid
            }
            isSaveLoading={saveTeacherOtherServicesMutation.isLoading}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </form>
    </FormProvider>
  )
}
