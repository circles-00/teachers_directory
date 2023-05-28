import { type FC, useMemo } from 'react'
import { Header, StepsHeader, type StepProps } from '@domains/sign-up'
import { ExperienceQuestionnaireForm } from './components'
import { ActionButtons } from '@domains/sign-up'
import { FormProvider, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import { api, formResolver } from '@utils'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'
import { useUpdate } from '@rounik/react-custom-hooks'

interface IExperienceQuestionnaireProps extends StepProps {}

export const ExperienceQuestionnaire: FC<IExperienceQuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  const { data } = api.teachers.getTeacherExperience.useQuery()

  const teacherExperienceMutation =
    api.teachers.saveTeacherExperience.useMutation({
      onSuccess: () => onNextStep({ currentStep, setCurrentStep, totalSteps }),
    })

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
  })

  const examiner = methods.watch('examiner')
  const examBoard = methods.watch('examBoard')

  const isExaminerValid = useMemo(() => {
    if (!examiner) {
      return true
    }

    return !!(examiner && examBoard && examBoard.length > 0)
  }, [examiner, examBoard])

  const onSubmit = (data: TSchema) => {
    teacherExperienceMutation.mutate(data)
  }

  useUpdate(() => {
    if (data?.experience) {
      methods.reset(data?.experience)
      methods.trigger().catch(console.error)
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:w-5/6">
          <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
          <Header
            title={'Tell us about your teaching life'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales'
            }
          />
          <ExperienceQuestionnaireForm />
          <div className="flex w-11/12">
            <ActionButtons
              saveDisabled={
                !methods.formState.isDirty ||
                !methods.formState.isValid ||
                !isExaminerValid
              }
              isSaveLoading={teacherExperienceMutation.isLoading}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
