import { z } from 'zod'

export const createPaymentIntentSchema = z.object({
  currency: z.string(),
  priceId: z.string(),
  paymentMethodId: z.string().optional(),
})

export type TCreatePaymentIntentInput = z.infer<
  typeof createPaymentIntentSchema
>
