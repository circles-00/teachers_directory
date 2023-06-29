import { createTRPCRouter } from '~/server/api/trpc'
import { paymentsRouter, teachersRouter, authRouter } from './routers'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  teachers: teachersRouter,
  payments: paymentsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
