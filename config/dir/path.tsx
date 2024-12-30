import { join } from 'lib'

export const PATH_DIR = {
  MOCK: join('__mock', 'sample-data.ts'),
  MOCK_PRODUCT: (slug: string) => join('product', slug),
  BAG: join('bag'),
  SIGN_IN: join('sign-in')
}
