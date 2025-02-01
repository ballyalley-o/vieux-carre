import { join } from 'lib'
import { GLOBAL } from 'config'

const protect = () => {
  const routesArray = GLOBAL.PROTECTED_ROUTES.split(';') || ""
  return routesArray.map((route: string) => new RegExp(join(route)))
}

export const PROTECTED_ROUTES = protect()
export const PATH_DIR = {
  ADMIN           : {
                      ORDER           : join('admin', 'order'),
                      OVERVIEW        : join('admin', 'overview'),
                      PRODUCT         : join('admin', 'product'),
                      PRODUCT_CREATE  : join('admin', 'product', 'create'),
                      PRODUCT_VIEW    : (productId: string) =>  join('admin', 'product', productId),
                      USER            : join('admin', 'user'),
                      USER_VIEW       : (userId: string) => join('admin', 'user', userId),
  },
  BAG             : join('bag'),
  CHECKOUT        : join('order', 'checkout'),
  MOCK            : join('__mock', 'sample-data.ts'),
  ORDER           : join('order'),
  ORDER_VIEW      : (id: string) => join('order', id),
  PAYMENT         : join('payment'),
  PRODUCT_VIEW    : (slug: string) => join('product', slug),
  PRODUCT_CALLBACK: (slug: string) => join('sign-in?callbackUrl=/product', slug),
  ROOT            : '/',
  SEARCH          : join('search'),
  SEARCH_QUERY    : (params: string) => join(`search?${params}`),
  SEARCH_CATEGORY : (category: string) => join(`search?category=${category}`),
  SHIPPING        : join('shipping'),
  SIGN_IN         : join('sign-in'),
  SIGN_UP         : join('sign-up'),
  USER           : {
                      ACCOUNT: join('user', 'account'),
                      ORDER  : join('user', 'order'),
    }
}
