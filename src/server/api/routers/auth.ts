import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import {
  signUp,
  signUpPayload,
  verifyAccount,
  verifyAccountPayload,
} from '~/server/api/logic'

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpPayload)
    .mutation(async ({ input, ctx }) => {
      const user = await signUp(input)
      return {
        user,
      }
    }),
  verifyAccount: publicProcedure
    .input(verifyAccountPayload)
    .mutation(async ({ input, ctx }) => {
      return verifyAccount(input)
    }),
})
