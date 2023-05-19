import { useUser } from '~/hooks/useAuth'
import { type TeachersDirectoryPage } from '~/types/page'
import { useRouter } from 'next/router'
import { isClient } from '@utils'

interface IUseAuthMiddlewareProps {
  Component: TeachersDirectoryPage
}

export const useAuthMiddleware = ({ Component }: IUseAuthMiddlewareProps) => {
  const router = useRouter()

  const { user, status } = useUser()

  if (
    Component.pageType === 'PRIVATE' &&
    status !== 'authenticated' &&
    status !== 'loading' &&
    !user &&
    isClient()
  ) {
    router.replace('/login').catch(console.error)
    return 'redirecting'
  }

  if (
    Component.pageType === 'PUBLIC' &&
    status === 'authenticated' &&
    user &&
    isClient()
  ) {
    router.replace('/').catch(console.error)
    return 'redirecting'
  }

  return 'authorized'
}
