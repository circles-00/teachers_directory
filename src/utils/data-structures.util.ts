import { cloneDeep, every } from 'lodash'
import isEmpty from 'lodash.isempty'

export const excludeKeysFromObject = <T, K extends keyof T>(
  object: T,
  keys: K[]
) => {
  const copyObject = cloneDeep(object)

  if (!copyObject) return object

  for (const key of keys) {
    delete copyObject[key]
  }
  return copyObject
}

export const checkIfAllKeysOfObjectsFromArrayAreEmpty = <T extends object>(
  array?: T[]
): boolean => {
  if (!array) return false

  return every(array, (el) => every(el, isEmpty))
}
