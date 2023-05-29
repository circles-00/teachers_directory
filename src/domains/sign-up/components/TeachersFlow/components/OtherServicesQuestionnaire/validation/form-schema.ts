import { z } from 'zod'
import { formRequiredString } from '@utils'

export const validationSchema = z.object({
  otherServices: z.array(
    z.object({
      title: formRequiredString(),
      description: formRequiredString(),
    })
  ),
})

export type TSchema = z.infer<typeof validationSchema>
