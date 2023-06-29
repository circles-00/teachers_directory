import { useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useMemo } from 'react'

export const usePaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/teachers/dashboard`,
      },
      redirect: 'if_required',
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      setIsSuccess(false)
    } else {
      setIsSuccess(true)
    }

    setIsLoading(false)
  }

  return {
    isLoading: useMemo(() => isLoading, [isLoading]),
    handleSubmit,
    isSuccess,
  }
}
