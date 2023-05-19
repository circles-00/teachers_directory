import { z } from 'zod'
import { type TUserRole } from '@shared'

export const SignUpSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, { message: 'First name is too short' })
    .max(50, { message: 'First name is too long' }),
  lastName: z
    .string({ required_error: 'Surname is required' })
    .min(2, { message: 'Surname is too short' })
    .max(50, { message: 'Surname is too long' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password too short' })
    .max(50, { message: 'Password is too long' }),
})

export type TSignUp = z.infer<typeof SignUpSchema> & { role: TUserRole }
