import { z } from 'zod'
import { formRequiredString } from '@utils'

export const validationSchema = z.object({
  role: formRequiredString(),
  subRole: formRequiredString(),
  teachingTime: formRequiredString(),
  qualification: z.boolean(),
  degree: z.boolean(),
  examiner: z.boolean(),
  examBoard: z.array(z.string()).optional(),
})

export type TSchema = z.infer<typeof validationSchema>
