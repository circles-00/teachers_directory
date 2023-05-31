import { z } from 'zod'
import { formRequiredString } from '@utils'
import { EErrorLabels } from './error-labels'

export const validationSchema = z.object({
  otherServices: z.array(
    z.object({
      title: formRequiredString({ required_error: EErrorLabels.title }),
      description: formRequiredString({
        required_error: EErrorLabels.description,
      }),
    })
  ),
})

export type TSchema = z.infer<typeof validationSchema>
