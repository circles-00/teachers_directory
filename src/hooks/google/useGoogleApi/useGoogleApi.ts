import { useLoadScript } from '@react-google-maps/api'
import { env } from '~/env.mjs'

export type TLibraries = Parameters<typeof useLoadScript>['0']['libraries']

interface UseGoogleApiProps {
  libraries: TLibraries
}

export const useGoogleApi = ({ libraries }: UseGoogleApiProps) => {
  const { isLoaded, loadError } = useLoadScript({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
    libraries,
  })

  return {
    isLoaded,
    loadError,
  }
}
