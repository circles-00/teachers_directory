import { type FC, useCallback } from 'react'
import { PaymentPlanCard } from './PaymentPlanCard'
import { paymentPlans } from '../../paymentPlansData'
import { api } from '../../../../../../utils'

interface IPaymentPlansProps {
  activePlan: number
  setActivePlan: (idx: number) => void
  price: number
}

export const PaymentPlans: FC<IPaymentPlansProps> = ({
  activePlan,
  setActivePlan,
  price,
}) => {
  const isActivePlan = useCallback(
    (idx: number) => idx === activePlan,
    [activePlan]
  )

  const { data: trialLeftDays } =
    api.teachers.getTeacherProfileCompletionProgress.useQuery(undefined, {
      select: (data) => data?.trialLeftDays,
    })

  return (
    <div className="mt-14 flex flex-col">
      <h1 className="text-xl font-bold">Account types</h1>
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        {paymentPlans.map((paymentPlan, idx) => (
          <PaymentPlanCard
            key={idx}
            index={idx}
            title={paymentPlan.title.replace('{{PRICE}}', `${price}`)}
            description={paymentPlan.description.replace(
              '{{TRIAL_DAYS}}',
              `${trialLeftDays ?? 0}`
            )}
            isActivePlan={isActivePlan(idx)}
            setIsActivePlan={() => setActivePlan(idx)}
          />
        ))}
      </div>
    </div>
  )
}
