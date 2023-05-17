import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import {
  loginPayload,
  resendVerificationEmailPayload,
  signUpPayload,
  verifyAccountPayload,
  AuthService,
} from '~/server/api/logic'

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpPayload).mutation(async ({ input }) => {
    const user = await AuthService.signUp(input)
    return {
      user,
    }
  }),
  verifyAccount: publicProcedure
    .input(verifyAccountPayload)
    .mutation(async ({ input }) => {
      return AuthService.verifyAccount(input)
    }),
  resendVerificationEmail: publicProcedure
    .input(resendVerificationEmailPayload)
    .mutation(async ({ input }) => {
      return AuthService.resendVerificationEmail(input)
    }),
})
