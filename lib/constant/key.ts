export const LOCALE = {
  EN: 'en',
  VI: 'vi'
}

export const VARIANT = {
  GHOST: 'ghost'
}

export const FORM = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

export const KEY = {
  BAG: 'bag',
  CLASS: 'class',
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
  ...FORM,
  ...LOCALE,
  ...VARIANT
}
