export const LOCALE = {
  EN: 'en',
  VI: 'vi'
}

export const METHOD = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
  OPTION: 'option'
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
  SESSION_BAG_ID: 'sessionBagId',
  CLASS: 'class',
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
  TEXT: 'text',
  ...FORM,
  ...LOCALE,
  ...METHOD,
  ...VARIANT
}
