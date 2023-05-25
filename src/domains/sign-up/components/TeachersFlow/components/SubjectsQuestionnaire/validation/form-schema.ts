import { z } from 'zod'
import { formRequiredString } from '@utils'

export const validationSchema = z.object({
  subjects: z.array(
    z.object({
      subjectName: formRequiredString(),
      level: formRequiredString(),
      examBoard: z.string().optional(),
    })
  ),
})

export type TSchema = z.infer<typeof validationSchema>
