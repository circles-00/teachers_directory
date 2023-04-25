import { z } from 'zod'

export const signUpPayload = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export type TSignUpPayload = z.infer<typeof signUpPayload>

export const verifyAccountPayload = z.object({
  email: z.string(),
  code: z.number(),
})

export type TVerifyAccountPayload = z.infer<typeof verifyAccountPayload>
