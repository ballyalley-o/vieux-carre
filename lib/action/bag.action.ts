'use server'
import { RESPONSE } from 'lib/constant'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addItemToBag(data: BagItem) {
  return RESPONSE.SUCCESS('Item added to bag')
}
