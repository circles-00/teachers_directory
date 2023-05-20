import { createTRPCRouter } from '~/server/api/trpc'
import { authRouter } from '~/server/api/routers/auth'
import { teachersRouter } from "~/server/api/routers/teachers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  teachers: teachersRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
