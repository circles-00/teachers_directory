import { z } from 'zod'

type TFormRequiredStringArgs = Parameters<typeof z.string>[0]

export const formRequiredString = (args?: TFormRequiredStringArgs) =>
  z.string({ ...args }).min(1, { message: args?.required_error })
