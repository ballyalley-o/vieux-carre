import { en, fr } from 'public/locale'

export const getTranslations = (locale: string, namespace: string) => {
  const resources: Record<string, Record<string, typeof en | typeof fr>> = {
    en: { common: en },
    fr: { common: fr }
  }

  return resources[locale]?.[namespace] || {}
}
