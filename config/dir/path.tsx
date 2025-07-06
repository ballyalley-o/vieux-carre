import { connect, connectUrl } from 'lib/util/connect'
import { GLOBAL } from 'config'

const protect = () => {
  const routesArray = GLOBAL.PROTECTED_ROUTES.split(';') || ""
  return routesArray.map((route: string) => new RegExp(connect(route)))
}

export const PROTECTED_ROUTES = protect()
export const PATH_DIR         = {
  ADMIN           : {
                      ORDER         : connect('admin', 'order'),
                      OVERVIEW      : connect('admin', 'overview'),
                      PRODUCT       : connect('admin', 'product'),
                      PRODUCT_CREATE: connect('admin', 'product', 'create'),
                      PRODUCT_VIEW  : (productId: string) =>  connect('admin', 'product', productId),
                      USER          : connect('admin', 'user'),
                      USER_VIEW     : (userId: string) => connect('admin', 'user', userId),
  },
  BAG             : join('bag'),
  CHECKOUT        : join('order', 'checkout'),
  EMAIL_IMAGE     : (img: string) => joinServer(GLOBAL.SERVER_URL, img),
  MOCK            : join('__mock', 'sample-data.ts'),
  ORDER           : join('order'),
  ORDER_VIEW      : (id: string) => join('order', id),
  PAYMENT         : join('payment'),
  PRODUCT_VIEW    : (slug: string) => join('product', slug),
  PRODUCT_CALLBACK: (slug: string) => join('sign-in?callbackUrl=/product', slug),
  ROOT            : '/',
  SEARCH          : connect('search'),
  SEARCH_QUERY    : (params: string) => connect(`search?${params}`),
  SEARCH_CATEGORY : (category: string) => connect(`search?category=${category}`),
  SHIPPING        : connect('shipping'),
  SIGN_IN         : connect('sign-in'),
  SIGN_UP         : connect('sign-up'),
  STRIPE_CALLBACK : (id: string) => connectUrl(GLOBAL.SERVER_URL, 'order', id, 'stripe-payment-success'),
  SUPPORT         : connectUrl(GLOBAL.SERVER_SUPPORT_URL),
  UPLOAD          : connect('api', 'upload'),
  USER            : {
                      ACCOUNT: connect('user', 'account'),
                      ORDER  : connect('user', 'order'),
  }
}
