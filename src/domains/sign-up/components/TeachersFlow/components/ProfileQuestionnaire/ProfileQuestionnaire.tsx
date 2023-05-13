import { useState, type FC } from 'react'
import { StepsHeader, type StepProps, Header } from '@domains/sign-up'
import {
  ButtonOutlined,
  CommonRadioGroup,
  InfoBox,
  Input,
  PencilIcon,
  RichTextEditor,
  RoundedContainer,
  TrashIcon,
} from '@components'
import { ProfilePicture, SocialLinkForm } from './components'
import { ActionButtons } from '@domains/sign-up'

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
  const [currentGender, setCurrentGender] = useState('')
  const [socialLinks, setSocialLinks] = useState([
    {
      type: '',
      link: '',
    },
  ])

  const onAddSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      {
        type: '',
        link: '',
      },
    ])
  }
  const onRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col md:w-5/6">
      <StepsHeader currentStep={currentStep} totalSteps={totalSteps} />
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
        <Input
          containerClassName="mt-1"
          placeholder="e.g English and Drama Teacher"
          label="You will need to write a short title for your profile page"
          labelClassName="text-sm"
          className="border-[#919EAB4D]"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <ProfilePicture />
        <RoundedContainer className="py-8 px-6 md:w-full">
          <h3 className="text-lg font-bold text-colorText">Deja Brady</h3>
          <div className="mt-4 flex gap-2">
            <p className="text-sm font-semibold text-[#637381]">Address:</p>
            <p className="text-sm font-semibold text-colorText">
              18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337
            </p>
          </div>

          <div className="mt-3 flex gap-2">
            <p className="text-sm font-semibold text-[#637381]">Email:</p>
            <p className="text-sm font-semibold text-colorText">
              Deja_brady@gmail.com
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex items-center gap-1">
              <TrashIcon
                size={{ width: 26, height: 22 }}
                fillColor="fill-danger"
              />
              <p className="font-semibold text-danger">Delete</p>
            </button>
            <button className="flex items-center gap-1">
              <PencilIcon />
              <p className="font-semibold text-primary">Edit</p>
            </button>
          </div>
        </RoundedContainer>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <div className="flex gap-2">
          <h3 className="text-lg font-bold">About you</h3>
          <InfoBox content="Say something about yourself" />
        </div>

        <RichTextEditor />
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <h3 className="text-lg font-bold">Gender</h3>
        <CommonRadioGroup<typeof currentGender>
          className="w-full flex-col md:flex-row"
          value={currentGender}
          onChange={setCurrentGender}
          options={genders}
        />
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <h3 className="text-lg font-bold">Date of birth</h3>
        <div className="flex flex-col gap-5 md:flex-row">
          <Input placeholder="Day" className="pl-4" />
          <Input placeholder="Month" className="pl-4" />
          <Input placeholder="Year" className="pl-4" />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-5">
        <h3 className="text-lg font-bold">Social links</h3>
        {socialLinks.map((socialLink, index, array) => (
          <SocialLinkForm
            key={index}
            index={index}
            onRemove={onRemoveSocialLink}
            isDisabled={array.length === 1}
          />
        ))}
      </div>
      <ButtonOutlined
        className="mr-auto mt-4 w-28 text-primary"
        onClick={onAddSocialLink}
      >
        Add Item
      </ButtonOutlined>

      <ActionButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={totalSteps}
      />
    </div>
  )
}
