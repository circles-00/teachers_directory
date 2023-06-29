import { PaymentElement } from '@stripe/react-stripe-js'
import { type StripePaymentElementOptions } from '@stripe/stripe-js'
import { type FC } from 'react'

interface INewCardFormProps {}

export const NewCardForm: FC<INewCardFormProps> = () => {
  const paymentElementOptions: StripePaymentElementOptions = {}

  return (
    <div>
      <PaymentElement options={paymentElementOptions} />
    </div>
  )
}
