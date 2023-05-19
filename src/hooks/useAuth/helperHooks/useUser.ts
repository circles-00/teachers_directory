import { useSession } from 'next-auth/react'

export const useUser = () => {
  const { data: session, status } = useSession()

  return {
    user: session?.user,
    isLoading: status === 'loading',
    status,
    isSignedIn: !!session?.user && status === 'authenticated',
  }
}
