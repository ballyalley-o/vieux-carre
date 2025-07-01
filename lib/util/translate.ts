import { en, fr, es } from 'public/locale'

type NestedKeys<T> = {
  [K in keyof T & string]: T[K] extends string ? K : T[K] extends Record<string, unknown> ? `${K}.${NestedKeys<T[K]>}` : never
}[keyof T & string]

type  LocaleLang = 'en' | 'fr' | 'es'
type  LocaleKey  = NestedKeys<typeof en>
const locales    = { en, fr, es }

/**
 * Retrieves a localized message based on the provided key and optional parameters.
 *
 * The function navigates through a nested object structure (assumed to be `en`)
 * using the dot-separated `key` to find the corresponding message. If the message
 * is found and is a string, it replaces placeholders in the format `{param}` with
 * the values provided in the `params` object.
 *
 * @param key {LocaleKey} - A dot-separated string representing the path to the desired message
 *                          in the localization object.
 * @param params - An optional object containing key-value pairs to replace placeholders
 *                 in the localized message.
 * @param locale - Language
 * @returns The localized message with placeholders replaced, or the original key if
 *          the message is not found or is not a string.
 */
export const transl = (key: LocaleKey, params?: Record<string, string | number | boolean>, locale: LocaleLang = 'en'): string => {
  const messages = locales[locale] || locales['en']
  const message = key
    .split('.')
    .reduce((o: unknown, i: string) => (o && typeof o === 'object' && i in o ? (o as Record<string, unknown>)[i] : null), messages)

  if (!message) {
    return key
  }

  if (typeof message !== 'string') {
    return key
  }

  let result = message as string

  if (params) {
    Object.keys(params).forEach((param) => {
      result = result.replace(new RegExp(`{${param}}`, 'g'), String(params[param]))
    })
  }

  return result
}
