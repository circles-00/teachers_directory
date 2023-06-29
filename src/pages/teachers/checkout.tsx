import { type NextPage } from 'next'
import { Sidebar } from '@domains/teachers'
import { CheckoutForm } from '@domains/payments'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js'
import { useMemo, useState } from 'react'
import { env } from '../../env.mjs'
import { api } from '@utils'
import { useUpdate } from '@rounik/react-custom-hooks'

const CheckoutPage: NextPage = () => {
  const [clientSecret, setClientSecret] = useState('')

  const { data } = api.payments.createPaymentIntent.useQuery({
    // TODO: Maybe change hardcoded data if needed in the future
    currency: 'gbp',
    priceId: env.NEXT_PUBLIC_PRICE_ID,
  })

  const stripePromise = useMemo(
    () => loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  )

  const paymentElementOptions: StripeElementsOptions = {
    clientSecret: clientSecret ?? '',
    appearance: {
      variables: {},
    },
  }

  useUpdate(() => {
    if (data?.clientSecret) setClientSecret(data.clientSecret)
  }, [data])

  if (!clientSecret) return null

  return (
    <Elements stripe={stripePromise} options={paymentElementOptions}>
      <div className="flex">
        <Sidebar />
        <CheckoutForm />
      </div>
    </Elements>
  )
}

export default CheckoutPage
