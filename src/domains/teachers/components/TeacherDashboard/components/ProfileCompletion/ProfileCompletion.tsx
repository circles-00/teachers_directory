import { type FC } from 'react'
import { useUser } from '~/hooks/useAuth'
import { ButtonContained, LinearProgressBar } from '@components'
import { api } from '@utils'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface IProfileCompletionProps {}
interface ISectionProps {
  title: string
  isComplete: boolean
}
interface IProfileCompletionBannerProps {
  progress: number
}

function ProfileCompletionBanner({ progress }: IProfileCompletionBannerProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 bg-[#00AB5529] py-4">
      <h3 className="text-sm font-bold">Profile completeness</h3>
      <LinearProgressBar
        containerClassName="w-[80%]  bg-white"
        progress={progress}
      />
      <p className="text-xs">
        Your profile is <span className="text-primary">{progress}%</span>{' '}
        complete, continue with the progress
      </p>
      <ButtonContained className="py-3 px-4 text-sm" disabled={true}>
        Profile not live
      </ButtonContained>
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
  const { user, userFullName } = useUser()
  const { data: teacherProfile } = api.teachers.getTeacherProfile.useQuery()
  const { data: profileProgress } =
    api.teachers.getTeacherProfileCompletionProgress.useQuery()

  return (
    <div className="flex w-1/2 flex-col rounded-lg border-2 border-gray-100 py-7">
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
        <ProfileCompletionBanner progress={profileProgress?.progress ?? 0} />
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
