export const formatNumberWithDecimal = (num: number): string => {
  const [integer, decimal] = num.toString().split('.')
  return decimal ? `${integer}.${decimal.padEnd(2, '0')}` : `${integer}.00`
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'NZD',
  style: 'currency',
  minimumFractionDigits: 2,
})

export const formatCurrency = (amount: number | string | null): string => {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount)
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(parseFloat(amount))
  } else {
    return 'NaN'
  }
}