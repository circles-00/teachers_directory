import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

export const usePageLoading = () => {
  const router = useRouter()

  // TODO: Move to Zustand state
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setIsLoading(true)
    const handleComplete = (url: string) =>
      setTimeout(() => url === router.asPath && setIsLoading(false), 500)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return { isLoading: useMemo(() => isLoading, [isLoading]) }
}
