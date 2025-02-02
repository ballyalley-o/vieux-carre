export function convertToPlainObject<T>(value: T) {
  return JSON.parse(JSON.stringify(value))
}

export function toCents(price: string | number): number {
  if (typeof price === 'string') {
    price = Number(price)
    return price * 100
  }
  return price * 100
}