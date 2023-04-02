import { ELabels } from '../constants'

// This is a hook that returns the labels object, in case we need to use translations
export const useLabels = () => {
  return { labels: ELabels }
}
