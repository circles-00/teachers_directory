import { type ChangeEvent, useMemo, useState } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { first } from 'lodash'
import { useUpdate } from '@rounik/react-custom-hooks'
import { type TOption } from '@components'

type Coordinates = {
  lat: number | null
  lng: number | null
}

interface IUseAutoCompletePlacesProps {
  isLoaded: boolean
}

export const useAutoCompletePlaces = ({
  isLoaded,
}: IUseAutoCompletePlacesProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lng: null,
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

  const handleSelect = ({ value: description }: TOption) => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => {
        // TODO: Fix this
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const { lat, lng } = getLatLng(first(results) as any)
        setCoordinates({ lat, lng })
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
  }
}
