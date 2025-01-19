import { GLOBAL } from "config/global"

const LOCALE = GLOBAL.LOCALE as Intl.LocalesArgument

export const formatNumberWithDecimal = (num: number): string => {
  const [integer, decimal] = num.toString().split('.')
  return decimal ? `${integer}.${decimal.padEnd(2, '0')}` : `${integer}.00`
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(LOCALE, {
  currency             : GLOBAL.PRICES.CURRENCY,
  style                : 'currency',
  minimumFractionDigits: 2
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