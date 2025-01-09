export function float2(value: number | string): number {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100
  } else if (typeof value === 'string') {
    const numValue = Number(value)
    return Math.round((numValue + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('Type of value is invalid')
  }
}
