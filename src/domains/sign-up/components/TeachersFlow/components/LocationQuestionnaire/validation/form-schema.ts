import { z } from 'zod'
import { EErrorLabels } from './error.labels'
import { formRequiredString } from '@utils'

export const validationSchema = z.object({
  streetAddress: formRequiredString({
    required_error: EErrorLabels.streetAddress.required,
    invalid_type_error: EErrorLabels.streetAddress.invalid,
  }),
  secondAddress: z.string().optional(),
  city: formRequiredString({
    required_error: EErrorLabels.city.required,
    invalid_type_error: EErrorLabels.city.invalid,
  }),
  postCode: formRequiredString({
    required_error: EErrorLabels.postCode.required,
    invalid_type_error: EErrorLabels.postCode.invalid,
  }),
})

export type TSchema = z.infer<typeof validationSchema>
