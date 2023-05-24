import { type ChangeEvent, useMemo, useState } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { first } from 'lodash'
import { useUpdate } from '@rounik/react-custom-hooks'
import { type TOption } from '@components'
import GeocoderResult = google.maps.GeocoderResult

export type TCoordinates = {
  latitude: number | null
  longitude: number | null
}

interface IUseAutoCompletePlacesProps {
  isLoaded: boolean
}

export const useAutoCompletePlaces = ({
  isLoaded,
}: IUseAutoCompletePlacesProps) => {
  const [coordinates, setCoordinates] = useState<TCoordinates>({
    latitude: null,
    longitude: null,
  })

  const [addressComponents, setAddressComponents] = useState({
    streetAddress: '',
    city: '',
    postCode: '',
  })

  const {
    ready,
    init,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })

  useUpdate(() => {
    if (isLoaded) {
      init()
    }
  }, [isLoaded])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const getAddressComponents = (geoCodeResults: GeocoderResult[]) => {
    const streetAddress =
      first(geoCodeResults)?.address_components?.find((component) =>
        component.types.includes('route')
      )?.long_name ?? ''
    const city =
      first(geoCodeResults)?.address_components?.find((component) =>
        component.types.includes('postal_town')
      )?.long_name ?? ''
    const postCode =
      first(geoCodeResults)?.address_components?.find((component) =>
        component.types.includes('postal_code')
      )?.long_name ?? ''

    return { streetAddress, city, postCode }
  }

  const handleSelect = ({ value: description }: TOption) => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => {
        // TODO: Fix this
        const { lat, lng } = getLatLng(first(results) as GeocoderResult)
        setCoordinates({ latitude: lat, longitude: lng })

        const streetComponents = getAddressComponents(results)
        setAddressComponents(streetComponents)
      })
      .catch(console.error)
  }

  return {
    handleInput,
    handleSelect,
    data: useMemo(() => data, [data]),
    ready,
    value,
    coordinates: useMemo(() => coordinates, [coordinates]),
    status,
    addressComponents: useMemo(() => addressComponents, [addressComponents]),
  }
}
