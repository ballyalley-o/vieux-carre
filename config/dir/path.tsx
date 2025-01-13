import { join } from 'lib'
import { GLOBAL } from 'config'

const protect = () => {
  const routesArray = GLOBAL.PROTECTED_ROUTES.split(';') || ""
  return routesArray.map((route: string) => new RegExp(join(route)))
}

export const PROTECTED_ROUTES = protect()
export const PATH_DIR = {
  BAG: join('bag'),
  MOCK: join('__mock', 'sample-data.ts'),
  PAYMENT: join('payment'),
  PLACE_ORDER: join('place-order'),
  PRODUCT_VIEW: (slug: string) => join('product', slug),
  ROOT: '/',
  SHIPPING: join('shipping'),
  SIGN_IN: join('sign-in'),
  SIGN_UP: join('sign-up')
}
