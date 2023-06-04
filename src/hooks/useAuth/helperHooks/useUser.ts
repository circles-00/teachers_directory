import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

export const useUser = () => {
  const { data: session, status } = useSession()

  const userFullName = useMemo(() => {
    if (!session?.user) return ''

    return `${session?.user?.firstName ?? ''} ${session?.user?.lastName ?? ''}`
  }, [session])

  return {
    user: session?.user,
    isLoading: status === 'loading',
    status,
    isSignedIn: !!session?.user && status === 'authenticated',
    userFullName,
  }
}
