import { type FC } from 'react'
import { type StepProps } from '../../types'
import { StepsHeader } from '@domains/sign-up'
import { Qualifications, Achievements } from './components'
import { ActionButtons } from '@domains/sign-up'
import { FormProvider, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import {
  api,
  checkIfAllKeysOfObjectsFromArrayAreEmpty,
  excludeKeysFromObject,
  formResolver,
} from '@utils'
import { initialAchievement, initialQualification } from './initialData'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'
import { useUpdate } from '@rounik/react-custom-hooks'

interface IQualificationsQuestionnaireProps extends StepProps {}

export const QualificationsQuestionnaire: FC<
  IQualificationsQuestionnaireProps
> = ({ currentStep, setCurrentStep, totalSteps }) => {
  const { data } = api.teachers.getTeacherQualifications.useQuery()

  const saveTeacherQualificationsMutation =
    api.teachers.saveQualifications.useMutation({
      onSuccess: () => onNextStep({ currentStep, setCurrentStep, totalSteps }),
    })

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      qualifications: [initialQualification],
      achievements: [initialAchievement],
    },
  })

  const onHandleSubmit = (data: TSchema) => {
    let dataToSubmit = { ...data }
    if (checkIfAllKeysOfObjectsFromArrayAreEmpty(dataToSubmit.achievements)) {
      dataToSubmit = excludeKeysFromObject(dataToSubmit, ['achievements'])
    }

    saveTeacherQualificationsMutation.mutate(dataToSubmit)
  }

  useUpdate(() => {
    if (data) {
      methods.reset({
        qualifications:
          data.qualifications.length > 0
            ? data.qualifications
            : [initialQualification],
        achievements:
          data.achievements.length > 0
            ? data.achievements
            : [initialAchievement],
      })
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col">
          <StepsHeader
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          <Qualifications
            title="Your qualifications (Optional)"
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales`}
          />
          <div className="mt-8">
            <Achievements
              title="Other relevant achievements (optional)"
              description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales`}
            />
          </div>

          <ActionButtons
            isSaveLoading={saveTeacherQualificationsMutation.isLoading}
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
