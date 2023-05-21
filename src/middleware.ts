import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { env } from '~/env.mjs'
import { NextResponse } from 'next/server'
import { EScreensList } from '~/types/page'

export async function middleware(request: NextRequest) {
  const screen = EScreensList.find(
    (screen) => request.nextUrl.pathname === screen.path
  )

  if (!screen) {
    return NextResponse.next()
  }

  const jwtToken = await getToken({ req: request, secret: env.NEXTAUTH_SECRET })
  if (
    !!jwtToken &&
    !!jwtToken?.user &&
    screen.type === 'PUBLIC' &&
    !!screen.redirect
  ) {
    return NextResponse.redirect(new URL(screen.redirect, request.url))
  }

  if (!jwtToken && screen.type === 'PRIVATE' && !!screen.redirect) {
    return NextResponse.redirect(new URL(screen.redirect, request.url))
  }

  return NextResponse.next()
}
