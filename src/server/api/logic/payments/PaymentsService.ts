import Stripe from 'stripe'
import { env } from '../../../../env.mjs'
import { type TCreatePaymentIntentInput } from './schema'
import { type ICreateCustomerPayload } from './types'
import { AuthService } from '../auth'
const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })

export const createPaymentIntent = async (
  payload: TCreatePaymentIntentInput,
  userId: string
) => {
  const paymentProfile = await AuthService.findUserPaymentProfileByUserId(
    userId
  )

  let subscription

  if (!paymentProfile?.clientSecret) {
    subscription = await createSubscription(
      paymentProfile?.stripeCustomerId as string,
      payload.priceId,
      payload.paymentMethodId
    )
  }

  const clientSecret =
    paymentProfile?.clientSecret && !subscription
      ? paymentProfile?.clientSecret
      : (
          (subscription?.latest_invoice as Stripe.Invoice)
            ?.payment_intent as Stripe.PaymentIntent
        )?.client_secret

  await AuthService.updatePaymentClientSecret(userId, clientSecret as string)

  return {
    clientSecret,
  }
}

export const createManualSubscription = async (
  payload: TCreatePaymentIntentInput,
  userId: string
) => {
  const paymentProfile = await AuthService.findUserPaymentProfileByUserId(
    userId
  )

  return await createSubscription(
    paymentProfile?.stripeCustomerId as string,
    payload.priceId,
    payload.paymentMethodId
  )
}

export const createSubscription = async (
  customerId: string,
  priceId: string,
  paymentMethodId?: string
) => {
  if (!!paymentMethodId) {
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })
  }

  return await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: !!paymentMethodId
      ? 'error_if_incomplete'
      : 'default_incomplete',

    payment_settings: {
      save_default_payment_method: !!paymentMethodId
        ? 'off'
        : 'on_subscription',
      payment_method_types: ['card'],
    },
    expand: ['latest_invoice.payment_intent'],
  })
}

export const createCustomer = async (payload: ICreateCustomerPayload) => {
  return await stripe.customers.create({
    email: payload.email,
    name: payload.name,
    metadata: {
      ...payload,
    },
  })
}

export const getPrices = async () => {
  return await stripe.prices.list()
}

export const getCustomerSubscriptions = async (customerId: string) => {
  return await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  })
}
