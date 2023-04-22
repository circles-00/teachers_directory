import { type FC } from 'react'

const Step: FC<{ step: number; description: string }> = ({
  step,
  description,
}) => (
  <div className="mt-6 flex gap-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
      {step}
    </div>
    <p className="w-2/3">{description}</p>
  </div>
)

interface INextStepsProps {}

export const NextSteps: FC<INextStepsProps> = () => {
  return (
    <div className="flex w-full flex-col">
      <h3 className="font-bold">Next steps</h3>
      <Step
        step={1}
        description="After the sign up process, we will send you a link to your email
          address to verify your account."
      />

      <div className="ml-[-1.75rem] mb-8 w-24 rotate-90 border-[1px] border-[#919EAB3D]"></div>

      <Step
        step={2}
        description="Your will be the primary admin user. This will allow you to add users from your dashboard."
      />
    </div>
  )
}
