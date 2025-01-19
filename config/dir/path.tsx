import { join } from 'lib'
import { GLOBAL } from 'config'

const protect = () => {
  const routesArray = GLOBAL.PROTECTED_ROUTES.split(';') || ""
  return routesArray.map((route: string) => new RegExp(join(route)))
}

export const PROTECTED_ROUTES = protect()
export const PATH_DIR = {
  BAG         : join('bag'),
  CHECKOUT    : join('order', 'checkout'),
  MOCK        : join('__mock', 'sample-data.ts'),
  ORDER       : join('order'),
  ORDER_VIEW  : (id: string) => join('order', id),
  PAYMENT     : join('payment'),
  PRODUCT_VIEW: (slug: string) => join('product', slug),
  ROOT        : '/',
  SHIPPING    : join('shipping'),
  SIGN_IN     : join('sign-in'),
  SIGN_UP     : join('sign-up'),
  USER        : {
                  ACCOUNT: join('user', 'account'),
                  ORDER  : join('user', 'order'),
  }
}
