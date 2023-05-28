import { every } from 'lodash'
import isEmpty from 'lodash.isempty'

export const excludeKeysFromObject = <T, K extends keyof T>(
  object: T,
  keys: K[]
) => {
  if (!object) return object

  for (const key of keys) {
    delete object[key]
  }
  return object
}

export const checkIfAllKeysOfObjectsFromArrayAreEmpty = <T extends object>(
  array?: T[]
): boolean => {
  if (!array) return false

  return every(array, (el) => every(el, isEmpty))
}
