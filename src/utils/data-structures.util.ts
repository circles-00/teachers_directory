export const excludeKeysFromObject = <T, K extends keyof T>(
  object: T,
  keys: K[]
) => {
  for (const key of keys) {
    delete object[key]
  }
  return object
}
