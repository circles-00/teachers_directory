import { useUser } from '~/hooks/useAuth'
import { type TeachersDirectoryPage } from '~/types/page'
import { useRouter } from 'next/router'
import { isClient } from '@utils'
import { useCurrentScreenId } from "~/hooks/useStore/helperHooks/usePagesStore";

interface IUseAuthMiddlewareProps {
  Component: TeachersDirectoryPage
}

export const useAuthMiddleware = ({ Component }: IUseAuthMiddlewareProps) => {
  const router = useRouter()

  const { user, status } = useUser()
  const currentScreenId = useCurrentScreenId()

  if (
    Component.pageType === 'PRIVATE' &&
    Component.screenId === currentScreenId &&
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
    Component.screenId === currentScreenId &&
    status === 'authenticated' &&
    user &&
    isClient()
  ) {
    router.replace('/').catch(console.error)
    return 'redirecting'
  }

  return 'authorized'
}
