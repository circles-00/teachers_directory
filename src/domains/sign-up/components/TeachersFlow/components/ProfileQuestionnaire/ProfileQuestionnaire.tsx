import { type FC } from 'react'
import { StepsHeader, type StepProps, Header } from '@domains/sign-up'
import {
  ButtonOutlined,
  InfoBox,
  RadioGroupFormField,
  RichTextEditorFormField,
  SelectFormField,
  TextFormField,
} from '@components'
import { SocialLinkForm } from './components'
import { ActionButtons } from '@domains/sign-up'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { type TSchema, validationSchema } from './validation'
import {
  api,
  excludeKeysFromObject,
  formResolver,
  generateArray,
  getDatePartsFromDateString,
  getMonthNameFromNumber,
} from '@utils'
import { PhotoFormField } from '@components/form-fields/PhotoFormField'
import { useUpdate } from '@rounik/react-custom-hooks'
import { onNextStep } from '@domains/sign-up/components/StepperSidebar/utils'

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

interface IProfileQuestionnaireProps extends StepProps {}

export const ProfileQuestionnaire: FC<IProfileQuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
}) => {
  const initialSocialLink = {
    platform: '',
    url: 'https://',
  }

  const { data } = api.teachers.getTeacherProfile.useQuery()

  const saveTeacherMutation = api.teachers.saveTeacherProfile.useMutation({
    onSuccess: () => onNextStep({ currentStep, setCurrentStep, totalSteps }),
  })

  const methods = useForm<TSchema>({
    resolver: formResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      socialLinks: [initialSocialLink],
    },
  })

  const {
    fields: socialLinks,
    append,
    remove,
  } = useFieldArray({
    name: 'socialLinks',
    control: methods.control,
  })

  const onAddSocialLink = () => {
    append(initialSocialLink)
  }
  const onRemoveSocialLink = (index: number) => {
    remove(index)
  }

  const onSubmit = (value: TSchema) => {
    saveTeacherMutation.mutate(
      excludeKeysFromObject(value, ['day', 'month', 'year'])
    )
  }

  useUpdate(() => {
    if (data) {
      const { day, month, year } = getDatePartsFromDateString(data?.dateOfBirth)

      methods.reset({
        ...data,
        profilePhoto: data.profilePhoto as string,
        about: data.about as string,
        day,
        month: getMonthNameFromNumber(Number.parseInt(month)),
        year,
        socialLinks:
          data?.socialLinks?.length > 0
            ? data?.socialLinks
            : [initialSocialLink],
      })
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:w-5/6">
          <StepsHeader
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          <Header
            title={'Your Profile'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis at tortor at sagittis. Nullam eleifend, justo vitae consequat blandit, turpis tortor sodales'
            }
          />

          <div className="mt-6">
            <h1 className="text-lg font-bold text-primary">
              Write a title for your profile
            </h1>
            <TextFormField<TSchema>
              name="title"
              containerClassName="mt-1"
              placeholder="e.g English and Drama Teacher"
              label="You will need to write a short title for your profile page"
              labelClassName="text-sm"
              className="border-[#919EAB4D]"
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <PhotoFormField<TSchema> name="profilePhoto" />
          </div>

          <div className="mt-8 flex flex-col gap-5">
            <div className="flex gap-2">
              <h3 className="text-lg font-bold">About you</h3>
              <InfoBox content="Say something about yourself" />
            </div>

            <RichTextEditorFormField<TSchema> name="about" />
          </div>

          <div className="mt-8 flex flex-col gap-5">
            <h3 className="text-lg font-bold">Gender</h3>
            <RadioGroupFormField<string, TSchema>
              name="gender"
              className="w-full flex-col md:flex-row"
              options={genders}
            />
          </div>

          <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">Date of birth</h3>
              <InfoBox content="Your date of birth will not be shown on your profile" />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <SelectFormField<TSchema>
                options={generateArray(31).map((item) => ({
                  value: `${item + 1}`,
                }))}
                name="day"
                placeholder="Day"
              />
              <SelectFormField<TSchema>
                name="month"
                options={generateArray(12).map((el) => ({
                  value: getMonthNameFromNumber(el + 1),
                }))}
                placeholder="Month"
              />
              <SelectFormField<TSchema>
                name="year"
                options={generateArray(new Date().getFullYear() + 1 - 1930)
                  .map((el) => ({
                    value: `${el + 1930}`,
                  }))
                  .sort((a, b) => Number(b.value) - Number(a.value))}
                placeholder="Year"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-5">
            <h3 className="text-lg font-bold">Social links</h3>
            {socialLinks.map((field, index, array) => {
              const fieldsErrors = methods.formState.errors.socialLinks?.[index]

              return (
                <SocialLinkForm
                  platform={{
                    name: methods.register(
                      `socialLinks.${index}.platform` as const
                    ).name,
                  }}
                  url={{
                    name: methods.register(`socialLinks.${index}.url` as const)
                      .name,
                    errors: fieldsErrors?.url?.message,
                  }}
                  key={field.id}
                  index={index}
                  onRemove={onRemoveSocialLink}
                  isDisabled={array.length === 1}
                />
              )
            })}
          </div>
          <ButtonOutlined
            className="mr-auto mt-4 w-28 text-primary"
            onClick={onAddSocialLink}
          >
            Add Item
          </ButtonOutlined>

          <ActionButtons
            saveDisabled={
              !methods.formState.isDirty || !methods.formState.isValid
            }
            isSaveLoading={saveTeacherMutation.isLoading}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </form>
    </FormProvider>
  )
}
