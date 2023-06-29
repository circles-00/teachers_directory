import { useState, type FC, useMemo, useCallback } from 'react'
import { PaymentPlans, usePaymentForm } from './components'
import { env } from '../../../../env.mjs'
import { api, formResolver } from '@utils'
import { PaymentVault } from './components/PaymentVault'
import { FormProvider, useForm } from 'react-hook-form'
import {
  type TValidationSchema,
  validationSchema,
} from './components/PaymentVault/validation'
import { ButtonWithLoading } from '@components'
import { useUpdate } from '@rounik/react-custom-hooks'
import { useRouter } from 'next/router'

interface ICheckoutFormProps {}

const Summary: FC<{ paymentPlanPrice: number }> = ({ paymentPlanPrice }) => (
  <div className="mt-10 flex h-1/2 flex-col gap-3 rounded-md border-[1px] p-7">
    <h2 className="text-lg font-bold">Order Summary</h2>
    <div className="mb-2 mt-3 flex justify-between">
      <p className="text-sm text-[#637381]">Sub Total</p>
      <p className="text-sm">£{paymentPlanPrice}</p>
    </div>
    <hr className="w-full" />
    <div className="mt-2 flex justify-between">
      <p>Total: </p>
      <div>
        <p className="text-end font-bold text-danger">£{paymentPlanPrice}</p>
        <p className="text-xs">
          <i>(VAT included if applicable)</i>
        </p>
      </div>
    </div>
  </div>
)

export const CheckoutForm: FC<ICheckoutFormProps> = () => {
  const [activePlan, setActivePlan] = useState(1)
  const [isPaymentVaultOpen, setIsPaymentVaultOpen] = useState(false)

  const router = useRouter()

  const methods = useForm<TValidationSchema>({
    resolver: formResolver(validationSchema),
  })

  const { data: prices } = api.payments.getPrices.useQuery()
  const { data: paymentMethods, isLoading: isPaymentMethodsLoading } =
    api.payments.getUserPaymentMethods.useQuery()

  const paymentPlanPrice = useMemo(
    () =>
      (prices?.data?.find((plan) => plan?.id === env.NEXT_PUBLIC_PRICE_ID)
        ?.unit_amount ?? 0) / 100,
    [prices]
  )

  const createManualSubscriptionMutation =
    api.payments.createManualSubscription.useMutation()

  const {
    handleSubmit: handleOnNewCardPaymentSubmit,
    isLoading: isNewPaymentMethodLoading,
    isSuccess: isNewPaymentMethodSuccess,
  } = usePaymentForm()

  useUpdate(() => {
    if (!isPaymentMethodsLoading && (paymentMethods ?? [])?.length === 0) {
      setIsPaymentVaultOpen(false)
    }

    if (!isPaymentMethodsLoading && (paymentMethods ?? [])?.length > 0) {
      setIsPaymentVaultOpen(true)
    }
  }, [paymentMethods])

  const handleSubmit = useCallback(
    async ({ paymentMethodId }: TValidationSchema) => {
      if (!isPaymentVaultOpen) {
        return await handleOnNewCardPaymentSubmit()
      }

      createManualSubscriptionMutation.mutate({
        paymentMethodId,
        currency: 'gbp',
        priceId: env.NEXT_PUBLIC_PRICE_ID,
      })
    },
    [
      createManualSubscriptionMutation,
      handleOnNewCardPaymentSubmit,
      isPaymentVaultOpen,
    ]
  )

  useUpdate(() => {
    if (
      isNewPaymentMethodSuccess ||
      createManualSubscriptionMutation.isSuccess
    ) {
      setTimeout(() => {
        router.push('/teachers/dashboard').catch(console.error)
      }, 3000)
    }
  }, [isNewPaymentMethodSuccess, createManualSubscriptionMutation.isSuccess])

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="mt-14 flex w-full flex-col px-2 md:pl-10">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="flex flex-col md:flex-row md:gap-20">
            <div>
              <PaymentPlans
                activePlan={activePlan}
                setActivePlan={setActivePlan}
                price={paymentPlanPrice}
              />
              <div className="mt-10">
                <PaymentVault
                  isPaymentVaultOpen={isPaymentVaultOpen}
                  setIsPaymentVaultOpen={setIsPaymentVaultOpen}
                />
              </div>
            </div>
            <div className="mb-10 flex h-full w-full flex-col md:mb-0 md:w-1/4">
              <Summary paymentPlanPrice={paymentPlanPrice} />
              <ButtonWithLoading
                disabled={
                  (isPaymentVaultOpen && !methods.watch('paymentMethodId')) ||
                  isNewPaymentMethodSuccess ||
                  createManualSubscriptionMutation.isSuccess
                }
                isLoading={
                  isNewPaymentMethodLoading ||
                  createManualSubscriptionMutation.isLoading
                }
                className="mt-5 py-4"
              >
                Complete Order
              </ButtonWithLoading>

              {(isNewPaymentMethodSuccess ||
                createManualSubscriptionMutation.isSuccess) && (
                <p className="mt-2 text-sm text-primary">
                  Payment successful. Redirecting back to dashboard...
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
