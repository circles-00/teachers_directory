/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

import { prisma } from '~/server/db'

type CreateContextOptions = Record<string, never>

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  }
}

const createAuthUserContext = async (_opts: CreateNextContextOptions) => {
  const {req, res} = _opts
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return {
      user: session.user
    }
  }

  return {user: {} as TUser}
}

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
  const innerContext = createInnerTRPCContext({})
  const authUserContext = await createAuthUserContext(_opts)

  return {
    ...innerContext,
    ...authUserContext
  }
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from 'superjson'
import { ZodError } from 'zod'
import { getServerSession } from "next-auth";
import { authOptions } from "~/pages/api/auth/[...nextauth]";
import { type TUser } from "~/server/api/types";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */

const isUserAuthenticated = t.middleware((opts) => {
  const { ctx } = opts
  if(!ctx?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return opts.next({
    ctx: {
      user: ctx.user
    }
  })

})

const checkUserRole = (role: TUser['role']) => t.middleware((opts) => {
  const { ctx } = opts
  if(!ctx?.user && ctx?.user?.role !== role) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return opts.next({
    ctx: {
      user: ctx.user
    }
  })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isUserAuthenticated)
export const teacherProcedure = t.procedure.use(checkUserRole('TEACHER'))
export const schoolProcedure = t.procedure.use(checkUserRole('SCHOOL'))
export const adminProcedure = t.procedure.use(checkUserRole('ADMIN'))
export const generalUserProcedure = t.procedure.use(checkUserRole('GENERAL'))
