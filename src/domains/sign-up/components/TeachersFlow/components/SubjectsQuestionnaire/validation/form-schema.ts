import { z } from 'zod'
import { formRequiredString } from '@utils'

export const validationSchema = z.object({
  subjects: z.array(
    z.object({
      subjectName: formRequiredString(),
      level: formRequiredString(),
      mainSubjectSelect: z.string(),
      isMainSubject: z.boolean(),
      examBoard: z.string().optional(),
    })
  ),
})

export type TSchema = z.infer<typeof validationSchema>
