import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(4, { message: 'Username must contain at least 4 characters' })
    .max(20, { message: 'Username is too long' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must contain at least 8 characters' })
    .max(20, {
      message: 'Password is too long',
    }),
})

export type TLoginForm = z.infer<typeof LoginSchema>
