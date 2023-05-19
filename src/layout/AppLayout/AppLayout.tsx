import { type FC, type ReactElement } from 'react'
import { useUser } from '~/hooks/useAuth'
import { useAuthMiddleware } from '@hooks'
import { type TeachersDirectoryPage } from '~/types/page'

export const AppLayout: FC<{
  children: ReactElement[]
  Component: TeachersDirectoryPage
}> = ({ children, Component }) => {
  const user = useUser()
  const authStatus = useAuthMiddleware({ Component })

  // NOTE: we need to show a progress indicator to user while we are loading his session
  if (user.status === 'loading' || authStatus === 'redirecting') {
    return null
  }

  return <>{children}</>
}
