import { type ComponentType, type FC, useMemo } from 'react'
import { useUser } from '~/hooks/useAuth'
import {
  ButtonWithLoading,
  CircleCheckIcon,
  ClockIcon,
  LinearProgressBar,
} from '@components'
import { api } from '@utils'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

interface IProfileCompletionProps {}

type TProfileStatus =
  | 'READY_FOR_REVIEW'
  | 'NOT_READY_FOR_REVIEW'
  | 'UNDER_REVIEW'
  | 'LIVE'
  | 'PAID'
  | 'TRIAL_OVER'
interface ISectionProps {
  title: string
  isComplete: boolean
}
interface IProfileCompletionBannerProps {
  progress: number
  label: string
  buttonText: string
  icon?: ComponentType
  buttonDisabled?: boolean
  profileStatus: TProfileStatus
  buttonOnClick?: () => void
  isButtonLoading?: boolean
}

function ProfileCompletionBanner({
  progress,
  label,
  buttonText,
  icon: Icon,
  buttonDisabled,
  profileStatus,
  buttonOnClick,
  isButtonLoading,
}: IProfileCompletionBannerProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 bg-[#00AB5529] py-4">
      <h3 className="text-sm font-bold">Profile completeness</h3>
      <LinearProgressBar
        containerClassName="w-[80%]  bg-white"
        progress={progress}
      />
      <p className="text-xs">
        {profileStatus !== 'LIVE' && (
          <span className="mr-1">
            Your profile is{' '}
            <span className="text-primary">{progress}% complete</span>
          </span>
        )}
        {label}
      </p>
      {profileStatus !== 'UNDER_REVIEW' ? (
        <ButtonWithLoading
          onClick={buttonOnClick}
          isLoading={!!isButtonLoading}
          className="flex items-center gap-2 px-4 text-sm"
          disabled={buttonDisabled}
        >
          {buttonText}
          {Icon && (
            <div className="ml-auto">
              <Icon />
            </div>
          )}
        </ButtonWithLoading>
      ) : (
        <button
          className="flex cursor-default items-center gap-2 rounded-lg border-[1px] border-gray-300 bg-transparent p-2 text-sm font-bold"
          type="button"
          disabled={true}
        >
          {buttonText}
          {Icon && (
            <div className="ml-auto">
              <Icon />
            </div>
          )}
        </button>
      )}
    </div>
  )
}

function Section({ title, isComplete }: ISectionProps) {
  return (
    <div className="flex w-full items-center px-7">
      <p className="text-sm">{title}</p>
      <p
        className={`ml-auto mr-4 rounded-lg ${
          isComplete ? 'bg-primary' : 'bg-[#919EAB]'
        } py-1 px-3 text-sm font-bold text-white`}
      >
        {isComplete ? 'Complete' : 'Incomplete'}
      </p>
      <ChevronRightIcon className="h-5 w-5 stroke-2" />
    </div>
  )
}

export const ProfileCompletion: FC<IProfileCompletionProps> = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { user, userFullName } = useUser()
  const { data: teacherProfile } = api.teachers.getTeacherProfile.useQuery()
  const { data: profileProgress } =
    api.teachers.getTeacherProfileCompletionProgress.useQuery()
  const submitProfileForReviewMutation =
    api.teachers.submitProfileForReview.useMutation({
      onSuccess: () => {
        queryClient
          .invalidateQueries(
            api.teachers.getTeacherProfileCompletionProgress.getQueryKey()
          )
          .catch(console.error)
      },
    })

  const profileCompletionContent = useMemo(() => {
    const profileStatus = profileProgress?.profileStatus as TProfileStatus

    if (profileStatus === 'NOT_READY_FOR_REVIEW') {
      return {
        label: 'continue with the progress',
        buttonText: 'Profile not live',
        buttonDisabled: true,
      }
    }

    if (profileStatus === 'READY_FOR_REVIEW') {
      return {
        label: 'submit your profile for review',
        buttonText: 'Submit your profile for review',
        buttonOnClick: () => submitProfileForReviewMutation.mutate(),
      }
    }

    if (profileStatus === 'UNDER_REVIEW') {
      return {
        label: '',
        buttonText: 'Your profile is under review',
        icon: ClockIcon,
      }
    }

    if (profileStatus === 'LIVE') {
      return {
        label: `You have ${
          profileProgress?.trialLeftDays ?? 0
        } days left on your free trial`,
        buttonText: 'Upgrade now',
        icon: CircleCheckIcon,
        buttonOnClick: () => {
          router.push('/teachers/checkout').catch(console.error)
        },
      }
    }

    if (profileStatus === 'PAID') {
      return {
        label: '',
        buttonText: 'Subscription active',
        icon: CircleCheckIcon,
      }
    }

    if (profileStatus === 'TRIAL_OVER') {
      return {
        label: '',
        buttonText: 'Your trial is over, please upgrade now',
        icon: CircleCheckIcon,
        buttonOnClick: () => {
          router.push('/teachers/checkout').catch(console.error)
        },
      }
    }

    return {
      label: '',
      buttonText: '',
    }
  }, [
    profileProgress?.profileStatus,
    profileProgress?.trialLeftDays,
    router,
    submitProfileForReviewMutation,
  ])

  return (
    <div className="flex flex-col rounded-xl border-2 border-gray-100 py-7">
      <div className="flex flex-col items-center gap-4">
        <div
          // ! Note: Using inline style for backgrounds, due to Tailwind dynamic classNames behaviour
          // ! https://tailwindcss.com/docs/content-configuration#dynamic-class-names
          style={{
            backgroundImage: `url(${user?.profilePicture ?? ''})`,
            backgroundSize: 'cover',
            backgroundColor: '#F4F6F8',
            backgroundPosition: 'center',
          }}
          className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-full border-[1px] outline outline-dotted outline-offset-8 outline-[#919EAB52]"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold">{userFullName}</h1>
          <p className="text-sm font-bold text-[#2E9BFB]">
            {teacherProfile?.title ?? ''}
          </p>
        </div>
        <ProfileCompletionBanner
          isButtonLoading={submitProfileForReviewMutation.isLoading}
          profileStatus={profileProgress?.profileStatus as TProfileStatus}
          {...profileCompletionContent}
          progress={profileProgress?.progress ?? 0}
        />
        <p className="text-center text-sm">
          Your profile is not live. To go live complete the sections below:
        </p>
        <div className="flex w-full flex-col gap-3">
          {Object.values(profileProgress?.steps ?? {})?.map((step, idx) => (
            <Section key={idx} {...step} />
          ))}
        </div>
      </div>
    </div>
  )
}
