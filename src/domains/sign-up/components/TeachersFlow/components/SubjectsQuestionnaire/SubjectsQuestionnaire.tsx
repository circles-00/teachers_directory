import { type FC } from 'react'
import { StepsHeader, Header, Subject } from '@domains/sign-up'
import { ButtonOutlined } from '@components'
import { type StepProps } from '../../types'
import { ActionButtons } from '@domains/sign-up'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import { api, formResolver } from '@utils'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'
import { useUpdate } from '@rounik/react-custom-hooks'

interface ISubjectsQuestionnaireProps extends StepProps {}

export const SubjectsQuestionnaire: FC<ISubjectsQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  const initialSubject = {
    subjectName: '',
    level: '',
    examBoard: '',
    isMainSubject: false,
    mainSubjectSelect: '',
  }

  const saveTeacherSubjectsMutation = api.teachers.saveSubjects.useMutation({
    onSuccess: () => onNextStep({ currentStep, setCurrentStep, totalSteps }),
  })

  const { data: teacherSubjects } = api.teachers.getSubjects.useQuery()

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      subjects: [initialSubject],
    },
  })

  useUpdate(() => {
    if (teacherSubjects && teacherSubjects.length > 0) {
      methods.reset({
        subjects: teacherSubjects?.map((subject) => ({
          ...subject,
          examBoard: subject?.examBoard ?? '',
          mainSubjectSelect: subject?.isMainSubject ? 'Yes' : 'No',
        })),
      })
    }
  }, [teacherSubjects, methods])

  const { fields, append, remove } = useFieldArray({
    name: 'subjects',
    control: methods.control,
  })

  const addSubject = () => {
    append(initialSubject)
  }

  const removeSubject = (index: number) => {
    remove(index)
  }

  const onSubmit = (data: TSchema) => {
    const dataToSubmit = { ...data }
    dataToSubmit.subjects = dataToSubmit.subjects.map((subject) => {
      // Workaround
      subject.isMainSubject = subject.mainSubjectSelect === 'Yes'

      return subject
    })

    saveTeacherSubjectsMutation.mutate(dataToSubmit)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <StepsHeader
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          <Header
            title="What subject can you teach?"
            description={`Add the subject(s) you teach. You must select one or two main subjects that will appear on your profile.`}
          />
          {fields.map((field, index, array) => {
            const fieldErrors = methods.formState.errors.subjects?.[index]

            return (
              <Subject
                subjectName={{
                  name: methods.register(
                    `subjects.${index}.subjectName` as const
                  )?.name,
                  errors: fieldErrors?.subjectName?.message,
                }}
                subjectLevel={{
                  name: methods.register(`subjects.${index}.level` as const)
                    ?.name,
                  errors: fieldErrors?.level?.message,
                }}
                subjectExamBoard={{
                  name: methods.register(`subjects.${index}.examBoard` as const)
                    ?.name,
                  errors: fieldErrors?.examBoard?.message,
                }}
                isMainSubject={{
                  name: methods.register(
                    `subjects.${index}.mainSubjectSelect` as const
                  )?.name,
                }}
                index={index}
                onRemove={removeSubject}
                key={field.id}
                numberOfSubjects={array.length}
              />
            )
          })}
          <ButtonOutlined
            type="button"
            onClick={addSubject}
            className="mt-8 ml-auto w-28 text-primary"
          >
            Add Item
          </ButtonOutlined>

          <ActionButtons
            isSaveLoading={saveTeacherSubjectsMutation.isLoading}
            saveDisabled={
              !methods.formState.isDirty || !methods?.formState?.isValid
            }
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </form>
    </FormProvider>
  )
}
