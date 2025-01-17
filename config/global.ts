    // prettier-ignore
export const GLOBAL = {
  APP_NAME               : process.env.NEXT_PUBLIC_APP_NAME || 'Vieux Carré',
  APP_VERSION            : process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  APP_DESCRIPTION        : process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Old Square shop application',
  SERVER_URL             : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  DATABASE_URL           : process.env.DATABASE_URL || '',
  NEXTAUTH_STRATEGY      : process.env.NEXTAUTH_STRATEGY || 'jwt',
  LATEST_PRODUCT_QUANTITY: 4,
  LOCALE                 : process.env.NEXT_PUBLIC_LOCALE || 'en-US',
  PAYMENT_METHODS        : process.env.NEXT_PUBLIC_PAYMENT_METHODS,
  PAYMENT_METHOD_DEFAULT : process.env.NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD || 'PayPal',
  PAYPAL: {
    PAYPAL_API_URL   : process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com',
    PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID || '',
    PAYPAL_APP_SECRET: process.env.PAYPAL_APP_SECRET || '',
  },
  PROTECTED_ROUTES       : process.env.NEXT_PUBLIC_PROTECTED_ROUTES || '',
  PURCHASE_FLOW          : ['user_sign_in', 'shipping', 'payment', 'place_order'],
  PRICES                 : {
    CURRENCY             : process.env.NEXT_PUBLIC_CURRENCY || 'NZD',
    TAX                  : process.env.NEXT_PUBLIC_TAX || 0.15,
    NO_SHIPPING_THRESHOLD: process.env.NEXT_PUBLIC_NO_SHIPPING_THRESHOLD || 100,
    DEFAULT_SHIPPING_COST: process.env.NEXT_PUBLIC_DEFAULT_SHIPPING_COST || 10
  },
}
