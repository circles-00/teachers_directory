import { z } from 'zod'
import { formRequiredString } from '@utils'
import { EErrorLabels } from './error-labels'
import { some } from 'lodash'

export const validationSchema = z.object({
  availabilityTable: z
    .object({
      morning: z.array(z.boolean()).min(7).max(7),
      afternoon: z.array(z.boolean()).min(7).max(7),
      evening: z.array(z.boolean()).min(7).max(7),
    })
    .refine(
      (data) => some(Object.values(data), (array) => some(array, (el) => el)),
      {
        message: EErrorLabels.availabilityTable,
      }
    ),
  availableNow: z.boolean(),
  startDate: z.string().nullable().optional(),
  files: z
    .array(
      z.object({
        name: formRequiredString(),
        content: formRequiredString(),
      })
    )
    .refine((data) => data.length > 0, { message: EErrorLabels.files }),
  typeOfJob: formRequiredString(),
})

export type TSchema = z.infer<typeof validationSchema>
