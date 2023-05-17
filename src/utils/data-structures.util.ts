export const excludeKeysFromObject = <T, K extends keyof T>(
  object: T,
  keys: K[]
) => {
  for (let key of keys) {
    delete object[key]
  }
  return object
}
