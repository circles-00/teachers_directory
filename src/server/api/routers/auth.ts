import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import {
  resendVerificationEmail,
  resendVerificationEmailPayload,
  signUp,
  signUpPayload,
  verifyAccount,
  verifyAccountPayload,
} from '~/server/api/logic'

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpPayload).mutation(async ({ input }) => {
    const user = await signUp(input)
    return {
      user,
    }
  }),
  verifyAccount: publicProcedure
    .input(verifyAccountPayload)
    .mutation(async ({ input }) => {
      return verifyAccount(input)
    }),
  resendVerificationEmail: publicProcedure
    .input(resendVerificationEmailPayload)
    .mutation(async ({ input }) => {
      return resendVerificationEmail(input)
    }),
})
