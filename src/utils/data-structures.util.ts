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
