'use server'
import { cookies } from 'next/headers'
import { auth } from 'auth'
import { prisma } from 'db/prisma'
import { RESPONSE, CODE, KEY } from 'lib/constant'
import { convertToPlainObject, errorHandler } from 'lib/util'
import { BagItemSchema } from 'lib/schema'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addItemToBag(data: BagItem) {
  try {
    const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
    if (!sessionBagId) throw new Error('Session bag id not found')
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined

    const bag = await getMyBag()
    const item = BagItemSchema.parse(data)
    const product = await prisma.product.findFirst({ where: { id: item.productId } })

    console.log({
      'Session Bag Id': sessionBagId,
      'User Id': userId,
      Bag: bag,
      'Item Requested': item,
      Product: product
    })

    return RESPONSE.SUCCESS('Item added to bag')
  } catch (error) {
    return RESPONSE.ERROR(errorHandler(error as AppError), CODE.BAD_REQUEST)
  }
}

export async function getMyBag() {
  const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
  if (!sessionBagId) throw new Error('Session bag id not found')

  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  const bag = await prisma.bag.findFirst({ where: userId ? { userId } : { sessionBagId } })
  if (!bag) return undefined

  const myBag = convertToPlainObject({
    ...bag,
    items: bag.items as BagItem[],
    itemsPrice: bag.itemsPrice.toString(),
    totalPrice: bag.totalPrice.toString(),
    shippingPrice: bag.shippingPrice.toString(),
    taxPrice: bag.taxPrice.toString()
  })

  return myBag
}
