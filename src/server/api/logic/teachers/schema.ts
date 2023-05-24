import { z } from 'zod'

export const saveTeacherLocationPayload = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  streetAddress: z.string(),
  secondaryAddress: z.string().optional(),
  city: z.string(),
  postCode: z.string(),
})

export type TSaveTeacherLocationPayload = z.infer<
  typeof saveTeacherLocationPayload
>

export const saveTeacherPayload = z.object({
  userId: z.string().cuid(),
})

export type TSaveTeacherPayload = z.infer<typeof saveTeacherPayload>
