import { join } from 'lib'

export const PATH_DIR = {
  ROOT: '/',
  MOCK: join('__mock', 'sample-data.ts'),
  MOCK_PRODUCT: (slug: string) => join('product', slug),
  BAG: join('bag'),
  SIGN_IN: join('sign-in'),
  SIGN_UP: join('sign-up')
}
