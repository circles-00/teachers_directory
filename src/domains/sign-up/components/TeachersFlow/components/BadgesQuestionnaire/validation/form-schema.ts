import { z } from 'zod'
import { formRequiredString } from '@utils'

const badgeSchema = z.object({
  name: formRequiredString(),
  content: formRequiredString(),
  fileType: formRequiredString(),
})

export const validationSchema = z.object({
  qualificationBadges: z.array(badgeSchema).optional(),
  degreeBadges: z.array(badgeSchema).optional(),
  examinerBadges: z.array(badgeSchema).optional(),
  dbsBadges: z.array(badgeSchema).optional(),
})

export type TSchema = z.infer<typeof validationSchema>
