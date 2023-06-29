import { type NextApiRequest, type NextApiResponse } from 'next'
import { env } from '../../env.mjs'
import Stripe from 'stripe'
const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })
import { buffer } from 'micro'
import { prisma } from '../../server/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

  const signature = req.headers['stripe-signature']

  const requestBuffer = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      requestBuffer.toString(),
      signature as string,
      env.STRIPE_WEBHOOKS_SIGNING_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${JSON.stringify(err)}`)
  }

  if (event.type === 'invoice.payment_succeeded') {
    const dataObject = event.data.object as Stripe.Invoice
    //!
    // 1. LOG THE EVENT TO THE DB
    await prisma.paymentLogs.create({
      data: {
        stripeCustomerId: dataObject?.customer as string,
        logs: event.data.object,
      },
    })

    // 2. INVALIDATE THE USER'S SECRET
    await prisma.paymentProfile.update({
      data: {
        clientSecret: null,
      },
      where: {
        stripeCustomerId: dataObject?.customer as string,
      },
    })

    const paymentProfile = await prisma.paymentProfile.findUnique({
      where: {
        stripeCustomerId: dataObject?.customer as string,
      },
    })

    // UPDATE TEACHER PROFILE STATUS
    await prisma.teacher.update({
      data: {
        profileStatus: 'LIVE',
      },
      where: {
        userId: paymentProfile?.userId as string,
      },
    })
  }

  if (event.type === 'payment_method.attached') {
    const dataObject = event.data.object as Stripe.PaymentMethod

    const cardExpirationDate = `${dataObject?.card?.exp_month ?? 0}/${`${
      dataObject?.card?.exp_year ?? 0
    }`.slice(2)}`

    const paymentMethodExists = await prisma.paymentMethod.findUnique({
      where: {
        paymentMethodId: dataObject?.id,
      },
    })

    if (!paymentMethodExists) {
      await prisma.paymentProfile.update({
        data: {
          paymentMethods: {
            create: {
              fingerprint: dataObject?.card?.fingerprint as string,
              paymentMethodId: dataObject?.id,
              cardBrand: dataObject?.card?.brand as string,
              cardLast4: dataObject?.card?.last4 as string,
              cardExpirationDate,
            },
          },
        },
        where: {
          stripeCustomerId: dataObject?.customer as string,
        },
      })
    }
  }

  return res.status(200).send('OK')
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
