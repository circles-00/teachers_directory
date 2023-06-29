import { CheckIcon } from '@heroicons/react/24/outline'
import { type FC } from 'react'

interface IPaymentPlanCardProps {
  title: string
  description: string
  isActivePlan: boolean
  setIsActivePlan: () => void
  index: number
}

export const PaymentPlanCard: FC<IPaymentPlanCardProps> = ({
  title,
  description,
  isActivePlan,
  setIsActivePlan,
  index,
}) => {
  return (
    <div className="flex w-80 items-center gap-4 rounded-lg border-[1px] border-[#919EAB3D] py-5 pl-5 shadow-sm">
      {/* Radio Circle */}
      <button
        type="button"
        disabled={index === 0}
        onClick={setIsActivePlan}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-black ${
          isActivePlan ? 'bg-primary' : index === 0 ? 'bg-gray-200' : ''
        } ${index === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <CheckIcon
          className={`h-4 w-4 stroke-2 ${
            index === 0 ? 'text-gray-500' : 'text-white'
          }`}
        />
      </button>
      <div className="flex flex-col">
        <h1 className="text-sm font-bold">{title}</h1>
        <p className="text-sm font-semibold text-[#637381]">{description}</p>
      </div>
    </div>
  )
}
