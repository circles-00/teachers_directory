import { useLoadScript } from '@react-google-maps/api'
import { env } from '~/env.mjs'

export type TLibraries = Parameters<typeof useLoadScript>['0']['libraries']

interface UseGoogleApiProps {
  libraries: TLibraries
}

export const useGoogleApi = ({ libraries }: UseGoogleApiProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: (env.NEXT_PUBLIC_GOOGLE_API_KEY as string) ?? '',
    libraries,
  })

  return {
    isLoaded,
    loadError,
  }
}
