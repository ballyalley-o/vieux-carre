import { GLOBAL } from "vieux-carre"
import { SystemLogger } from "lib/app-logger"

const TAG    = "UTIL_FORMATTER"
const LOCALE = GLOBAL.LOCALE as Intl.LocalesArgument  // default

const _getUserLocale = () => {
  try {
    return  typeof window !== 'undefined' ?  navigator.language : LOCALE
  } catch {
    return LOCALE
  }
}

const _createFormatter = () => {
  try {
   const locale = new Intl.NumberFormat(_getUserLocale(), {
      currency: GLOBAL.PRICES.CURRENCY,
      style: 'currency',
      minimumFractionDigits: 2
    })
    return locale
  } catch (error) {
    SystemLogger.error(error as AppError, TAG, '_createFormatter', 'Error creating formatter')
    const defaultLocale = new Intl.NumberFormat(LOCALE, {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2
    })
    return defaultLocale
  }
}

export const formatLocale = _createFormatter()
export function formatSymbol(): string {
  try {
    const parts = formatLocale.formatToParts(0);
    if (!parts) {
      console.warn('formatToParts returned undefined')
      return GLOBAL.PRICES.CURRENCY_SYMBOL
    }
    const symbol = parts.find(part => part.type === 'currency')?.value
    if (!symbol) {
      console.warn('Currency symbol not found in formatToParts')
      return GLOBAL.PRICES.CURRENCY_SYMBOL
    }
    console.log('Currency symbol:', symbol)
    return symbol
  } catch (error) {
    console.warn('Error in formatSymbol:', error)
    return GLOBAL.PRICES.CURRENCY_SYMBOL
  }
}

export const formatNumberWithDecimal = (num: number): string => {
  const [integer, decimal] = num.toString().split('.')
  return decimal ? `${integer}.${decimal.padEnd(2, '0')}` : `${integer}.00`
}

const NUMBER_FORMATTER   = new Intl.NumberFormat(LOCALE)

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

export const formatCurrency = (amount: number | string | null): string => {
  if (typeof amount === 'number') {
    return formatLocale.format(amount)
  } else if (typeof amount === 'string') {
    return formatLocale.format(parseFloat(amount))
  } else {
    return 'NaN'
  }
}

export const formatId = (id: string): string  => {
  return `...${id.substring(id.length - 6)}`
}

export const formatDateTime = (dateString: Date): {dateTime: string, date: string, time: string} => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month : 'short',
    year  : 'numeric',
    day   : 'numeric',
    hour  : 'numeric',
    minute: 'numeric',
    hour12: true
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month  : 'short',
    year   : 'numeric',
    day    : 'numeric',
    minute : 'numeric',
    hour12 : true
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }
  const formattedDateTime: string = new Date(dateString).toLocaleString(LOCALE, dateTimeOptions)
  const formattedDate: string     = new Date(dateString).toLocaleString(LOCALE, dateOptions)
  const formattedTime: string     = new Date(dateString).toLocaleString(LOCALE, timeOptions)

  return {
      dateTime: formattedDateTime,
      date    : formattedDate,
      time    : formattedTime
  }
}