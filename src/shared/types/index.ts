import { z } from 'zod'

export const EUSerRole = z.enum(['TEACHER', 'SCHOOL', 'GENERAL', 'ADMIN'])

export type TUserRole = z.infer<typeof EUSerRole>

export const ELocationType = z.enum(['GOOGLE', 'MANUAL'])

export type TLocationType = z.infer<typeof ELocationType>
