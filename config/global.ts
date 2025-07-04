// prettier-ignore
export const GLOBAL = {
  APP_NAME          : process.env.NEXT_PUBLIC_APP_NAME || 'Vieux Carré',
  APP_VERSION       : process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  APP_DESCRIPTION   : process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Old Square shop application',
  SERVER_URL        : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  SERVER_SUPPORT_URL: process.env.NEXT_PUBLIC_SERVER_SUPPORT_URL || 'http://localhost:3000',
  NODE_ENV          : process.env.NODE_ENV || 'development',
  DB_URI            : process.env.DB_URI || '',
  ENCRYPTION_KEY    : process.env.ENCRYPTION_KEY || '',
  GOOGLE            : {
       CLIENT_ID    : process.env.GOOGLE_CLIENT_ID,
       CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  NEXTAUTH_SECRET        : process.env.NEXTAUTH_SECRET || '',
  NEXTAUTH_STRATEGY      : process.env.NEXTAUTH_STRATEGY || 'jwt',
  LATEST_PRODUCT_QUANTITY: 4,
  LOCALE                 : process.env.NEXT_PUBLIC_LOCALE || 'en-US',
  USER_ROLES             : process.env.USER_ROLES && process.env.USER_ROLES.split(';') || ['user', 'admin'],
  LIMIT                  : {
                            ADMIN_ORDERS: 10,
                            USER_ORDERS : 10,
                          },
  PAGE_SIZE              : 8,
  PAYMENT_METHODS        : process.env.NEXT_PUBLIC_PAYMENT_METHODS,
  PAYMENT_METHOD_DEFAULT : process.env.NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD || 'PayPal',
  PAYPAL                 : {
                            PAYPAL_API_URL   : process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com',
                            PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID || 'sb',
                            PAYPAL_APP_SECRET: process.env.PAYPAL_APP_SECRET || '',
                          },
  STRIPE                 :{
                            STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
                            STRIPE_SECRET_KEY     : process.env.STRIPE_SECRET_KEY || '',
                            STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET || '',
                          },
  PROTECTED_ROUTES       : process.env.NEXT_PUBLIC_PROTECTED_ROUTES || '',
  PURCHASE_FLOW          : ['user_sign_in', 'shipping', 'payment', 'place_order'],
  TITLE_SEPARATOR        : ' | ',
  PRICES                 : {
                            CURRENCY             : process.env.NEXT_PUBLIC_CURRENCY || 'USD',
                            CURRENCY_SYMBOL      : process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$',
                            TAX                  : process.env.NEXT_PUBLIC_TAX || 0.15,
                            NO_SHIPPING_THRESHOLD: process.env.NEXT_PUBLIC_NO_SHIPPING_THRESHOLD || 100,
                            DEFAULT_SHIPPING_COST: process.env.NEXT_PUBLIC_DEFAULT_SHIPPING_COST || 10
                          },
  PROMOTION              : {
                            PROMOTION_CODE : process.env.PROMOTION_CODE || 'PROMO',
                            PROMOTION_VALUE: process.env.PROMOTION_VALUE || 0.1,
                            MONEY_BACK_DAYS: process.env.MONEY_BACK_DAYS || 30
                          },
  RESEND                :{
                            RESEND_API_KEY: process.env.RESEND_API_KEY || '',
                            SENDER_EMAIL  : process.env.SENDER_EMAIL || 'onboarding@resend.dev'
                            },
  AWS                   : {
                            AWS_ACCESS_KEY_ID    : process.env.AWS_ACCESS_KEY_ID || "",
                            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
                            AWS_REGION           : process.env.AWS_REGION || "",
                            S3_BUCKET_NAME       : process.env.S3_BUCKET_NAME || "",
                            PUBLIC_URL           : `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
                          },
  HASH                  : {
                            TYPE       : process.env.HASH_TYPE,
                            MEMORY_COST: process.env.HASH_MEMORY_COST || '19456',
                            TIME_COST  : process.env.HASH_TIME_COST || '2',
                            PARALLELISM: process.env.HASH_PARALLELISM || '1',
                            SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10
  }
}
