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
  BAG             : connect('bag'),
  CHECKOUT        : connect('order', 'checkout'),
  EMAIL_IMAGE     : (img: string) => connectUrl(GLOBAL.SERVER_URL, img),
  MOCK            : connect('__mock', 'sample-data.ts'),
  ORDER           : connect('order'),
  ORDER_VIEW      : (id: string) => connect('order', id),
  PASSWORD_FORGOT : connect('forgot-password'),
  PASSWORD_RESET  : (token: string) => connectUrl(GLOBAL.SERVER_URL, `reset-password?token=${token}`),
  PAYMENT         : connect('payment'),
  PRODUCT_VIEW    : (slug: string) => connect('product', slug),
  PRODUCT_CALLBACK: (slug: string) => connect('sign-in?callbackUrl=/product', slug),
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
