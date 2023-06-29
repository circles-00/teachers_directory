import { createPaymentIntentSchema } from '../logic/payments'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { PaymentsService } from '../logic/payments'
import { AuthService } from '../logic'

export const paymentsRouter = createTRPCRouter({
  createPaymentIntent: protectedProcedure
    .input(createPaymentIntentSchema)
    .query(({ input, ctx }) => {
      return PaymentsService.createPaymentIntent(input, ctx.user.id)
    }),
  getPrices: protectedProcedure.query(() => {
    return PaymentsService.getPrices()
  }),
  getUserPaymentMethods: protectedProcedure.query(({ ctx }) => {
    return AuthService.findUserPaymentMethodsByUserId(ctx.user.id)
  }),
  createManualSubscription: protectedProcedure
    .input(createPaymentIntentSchema)
    .mutation(({ input, ctx }) => {
      return PaymentsService.createManualSubscription(input, ctx.user.id)
    }),
})
