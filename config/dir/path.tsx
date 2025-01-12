import { join } from 'lib'

export const PATH_DIR = {
  BAG: join('bag'),
  MOCK: join('__mock', 'sample-data.ts'),
  PAYMENT: join('payment'),
  PRODUCT_VIEW: (slug: string) => join('product', slug),
  ROOT: '/',
  SHIPPING: join('shipping'),
  SIGN_IN: join('sign-in'),
  SIGN_UP: join('sign-up')
}
