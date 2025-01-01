export const formatNumberWithDecimal = (num: number): string => {
  const [integer, decimal] = num.toString().split('.')
  return decimal ? `${integer}.${decimal.padEnd(2, '0')}` : `${integer}.00`
}
