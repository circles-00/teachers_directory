import { type FC } from 'react'
import Image from 'next/image'
import PaymentCardsImage from '@assets/payment_cards.png'
import { api } from '@utils'
import { SelectFormField } from '@components'
import { NewCardForm } from '../PaymentForm'
import { ArrowLongLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import { type TValidationSchema } from './validation'
import { useFormContext } from 'react-hook-form'

interface IPaymentVaultProps {
  isPaymentVaultOpen: boolean
  setIsPaymentVaultOpen: (isOpen: boolean) => void
}

export const PaymentVault: FC<IPaymentVaultProps> = ({
  isPaymentVaultOpen,
  setIsPaymentVaultOpen,
}) => {
  const { data: paymentMethods, isLoading } =
    api.payments.getUserPaymentMethods.useQuery()

  const { watch } = useFormContext<TValidationSchema>()

  const paymentMethodId = watch('paymentMethodId')

  const formatCardMask = (cardLast4: string) =>
    `**** **** **** ${cardLast4 ?? '****'}`

  return (
    <>
      <div className="flex flex-col rounded-md border-[1px] border-[#919EAB3D] p-5">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Credit / Debit Card</p>
            <p className="text-sm text-[#637381]">
              We support Mastercard, Visa, Discover and Stripe.
            </p>
          </div>
          <div className="flex items-center">
            <Image
              alt="Payment Cards"
              src={PaymentCardsImage.src}
              width={PaymentCardsImage.width}
              height={PaymentCardsImage.height}
            />
          </div>
        </div>
        {isPaymentVaultOpen && !isLoading ? (
          <div>
            <SelectFormField<TValidationSchema>
              name="paymentMethodId"
              containerClassName="mt-5"
              label="Cards"
              options={
                paymentMethods?.map((method) => ({
                  placeholder: formatCardMask(method.cardLast4),
                  value: method.paymentMethodId,
                })) ?? []
              }
              displayValue={formatCardMask(
                paymentMethods?.find(
                  (method) =>
                    method.paymentMethodId === watch('paymentMethodId')
                )?.cardLast4 ?? ''
              )}
            />
            {!paymentMethodId && (
              <p className="mt-2 text-xs text-danger">
                You must select a payment method!
              </p>
            )}

            <button
              type="button"
              onClick={() => setIsPaymentVaultOpen(false)}
              className="mt-5 flex gap-2 text-sm font-bold text-primary"
            >
              <PlusIcon className="h-5 w-5" /> Add new card
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <NewCardForm />
            {(paymentMethods ?? [])?.length > 0 && (
              <button
                type="button"
                onClick={() => setIsPaymentVaultOpen(true)}
                className="mt-5 flex gap-2 text-sm font-bold text-primary"
              >
                <ArrowLongLeftIcon className="h-5 w-5" /> Back
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
