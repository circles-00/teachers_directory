import { z } from 'zod'
import { EUSerRole } from '@shared'

export const signUpPayload = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: EUSerRole,
})

export type TSignUpPayload = z.infer<typeof signUpPayload>

export const verifyAccountPayload = z.object({
  email: z.string(),
  code: z.number(),
})

export type TVerifyAccountPayload = z.infer<typeof verifyAccountPayload>

export const resendVerificationEmailPayload = z.object({
  email: z.string(),
})

export type TResendVerificationEmailPayload = z.infer<
  typeof resendVerificationEmailPayload
>

export const loginPayload = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type TLoginPayload = z.infer<typeof loginPayload>
