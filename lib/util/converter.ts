export function convertToPlainObject<T>(value: T) {
  return JSON.parse(JSON.stringify(value))
}
