import { type FC } from 'react'
import { Header, type StepProps, StepsHeader } from '@domains/sign-up'
import { Badge } from '@domains/sign-up/components/TeachersFlow/components/BadgesQuestionnaire/components'
import { ActionButtons } from '@domains/sign-up'
import { FormProvider, useController, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'
import { useRouter } from 'next/router'

type TBadge = {
  title: string
  description: string
  name: keyof TSchema
}

const badges: TBadge[] = [
  {
    title: 'Teaching qualification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
    name: 'qualificationBadges',
  },
  {
    title: 'Degree',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
    name: 'degreeBadges',
  },
  {
    title: 'Examiner',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
    name: 'examinerBadges',
  },
  {
    title: 'DBS',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan ligula id ante mollis molestie. Donec non velit ut velit dignissim ultrices ut mattis erat. Suspendisse aliquet non turpis vitae consectetur.',
    name: 'dbsBadges',
  },
]

interface IBadgesQuestionnaireProps extends StepProps {}

export const BadgesQuestionnaire: FC<IBadgesQuestionnaireProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
}) => {
  const router = useRouter()

  const { data } = api.teachers.getTeacherBadges.useQuery()

  const saveTeacherBadgesMutation = api.teachers.saveTeacherBadges.useMutation({
    onSuccess: () => router.push('/teachers/dashboard'),
  })

  const methods = useForm<TSchema>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  useUpdate(() => {
    if (data) {
      methods.reset(data)
    }
  }, [data])

  const onSubmit = (data: TSchema) => {
    saveTeacherBadgesMutation.mutate(data)
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
            title={'Would you like a badge next to your name?'}
            description={`If you are a teacher, you can have a verified tag for each of the following evidence you produce.`}
          />
          <div className="mt-4 flex flex-col gap-4">
            {badges.map((badge, index) => (
              <Badge key={index} {...badge} initialValue={data?.[badge.name]} />
            ))}
          </div>

          <ActionButtons
            isSaveLoading={saveTeacherBadgesMutation.isLoading}
            saveDisabled={!methods.formState.isValid}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </form>
    </FormProvider>
  )
}
