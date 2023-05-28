import { z } from 'zod'
import { formRequiredString } from '@utils'
import { EErrorLabels } from './error-labels'

export const validationSchema = z.object({
  qualifications: z.array(
    z.object({
      university: formRequiredString(),
      course: formRequiredString({
        required_error: EErrorLabels.qualifications.course,
      }),
      grade: formRequiredString(),
    })
  ),
  achievements: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        grade: z.string(),
      })
    )
    .optional(),
})

export type TSchema = z.infer<typeof validationSchema>
