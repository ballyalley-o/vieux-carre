import { connect, connectUrl } from 'lib/util/connect'
import { GLOBAL } from 'config'

const protect = () => {
  const routesArray = GLOBAL.PROTECTED_ROUTES.split(';') || ""
  return routesArray.map((route: string) => new RegExp(connect(route)))
}

export const PROTECTED_ROUTES = protect()

const _BASE         = GLOBAL.SERVER_URL
const _BASE_SUPPORT = GLOBAL.SERVER_SUPPORT_URL
const _ADMIN        = 'admin'
const _API          = 'api'
const _BAG          = 'bag'
const _LEGAL        = 'legal'
const _ORDER        = 'order'
const _PRODUCT      = 'product'
const _USER         = 'user'

export const PATH_DIR         = {
  ADMIN           : {
                      ORDER         : connect(_ADMIN, 'order'),
                      OVERVIEW      : connect(_ADMIN, 'overview'),
                      PRODUCT       : connect(_ADMIN, _PRODUCT),
                      PRODUCT_CREATE: connect(_ADMIN, _PRODUCT, 'create'),
                      PRODUCT_VIEW  : (productId: string) =>  connect(_ADMIN, _PRODUCT, productId),
                      USER          : connect(_ADMIN, _USER),
                      USER_VIEW     : (userId: string) => connect(_ADMIN, _USER, userId),
  },
  BAG             : connect(_BAG),
  CHECKOUT        : connect(_ORDER, 'checkout'),
  EMAIL_IMAGE     : (img: string) => connectUrl(_BASE, img),
  LEGAL           : {
                    PRIVACY_POLICY: connect(_LEGAL, 'privacy-policy'),
                    TERMS_OF_USE  : connect(_LEGAL, 'terms-of-use')
  },
  MOCK            : connect('__mock', 'sample-data.ts'),
  ORDER           : connect(_ORDER),
  ORDER_VIEW      : (id: string) => connect(_ORDER, id),
  PASSWORD_FORGOT : connect('forgot-password'),
  PASSWORD_RESET  : (token: string) => connectUrl(_BASE, `reset-password?token=${token}`),
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
  STRIPE_CALLBACK : (id: string) => connectUrl(_BASE, 'order', id, 'stripe-payment-success'),
  SUPPORT         : connectUrl(_BASE_SUPPORT),
  UPLOAD          : connect(_API, 'upload'),
  USER            : {
                      ACCOUNT: connect(_USER, 'account'),
                      ORDER  : connect(_USER, 'order'),
  }
}
