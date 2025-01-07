export const LOCALE = {
  EN: 'en',
  VI: 'vi'
}

export const VARIANT = {
  GHOST: 'ghost'
}

export const FORM = {
  EMAIL: 'email',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  PASSWORD: 'password'
}

export const KEY = {
  BAG: 'bag',
  CALLBACK_URL: 'callbackUrl',
  CLASS: 'class',
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
  TEXT: 'text',
  ...FORM,
  ...LOCALE,
  ...VARIANT
}
