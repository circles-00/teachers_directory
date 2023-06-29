import { z } from 'zod'

export const validationSchema = z.object({
  paymentMethodId: z.string().optional(),
})

export type TValidationSchema = z.infer<typeof validationSchema>
