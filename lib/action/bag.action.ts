'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from 'auth'
import { prisma } from 'db/prisma'
import { GLOBAL, PATH_DIR } from 'config'
import { SystemLogger } from 'lib/app-logger'
import { BagItemSchema, BagSchema } from 'lib/schema'
import { RESPONSE, CODE, KEY } from 'lib/constant'
import { convertToPlainObject, float2 } from 'lib/util'
import { Prisma } from '@prisma/client'
import { en } from 'public/locale'

const { TAX, NO_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } = GLOBAL.PRICES

const TAG = 'BAG.ACTION'

const calculatePrices = (items: BagItem[]) => {
  const itemsPrice = float2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)),
    shippingPrice = float2(itemsPrice > Number(NO_SHIPPING_THRESHOLD) ? 0 : DEFAULT_SHIPPING_COST),
    taxPrice = float2(itemsPrice * Number(TAX)),
    totalPrice = float2(itemsPrice + shippingPrice + taxPrice)

  const prices = {
    itemsPrice   : itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice     : taxPrice.toFixed(2),
    totalPrice   : totalPrice.toFixed(2)
  }
  return prices
}

export async function addItemToBag(data: BagItem) {
  try {
    const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
    if (!sessionBagId) throw new Error(en.error.sesssion_not_found)
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined

    const bag = await getMyBag()
    const item = BagItemSchema.parse(data)
    const product = await prisma.product.findFirst({ where: { id: item.productId } })
    if (!product) throw new Error(en.error.product_not_found)

    if (!bag) {
      const newBag = BagSchema.parse({
        userId,
        items: [item],
        sessionBagId,
        ...calculatePrices([item])
      })
      await prisma.bag.create({ data: newBag })
      revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))
      return RESPONSE.SUCCESS(`${product.name} added to bag`)
    } else {
      const existItem = (bag.items as BagItem[]).find((x) => x.productId === item.productId)
      if (existItem) {
        //check stock
        if (product.stock < existItem.qty + item.qty) {
          return RESPONSE.ERROR(`${product.name} out of stock`, CODE.BAD_REQUEST)
        }
        //increase qty
        const foundItem = (bag.items as BagItem[]).find((x) => x.productId === item.productId)
        if (foundItem) {
          foundItem.qty = existItem.qty + 1
        } else {
          throw new Error(en.error.no_existing_item)
        }
      } else {
        //still check stock
        if (product.stock < 1) throw new Error(`${product.name} out of stock`)
        bag.items.push(item)
      }
      // save to db whether with stock check or not
      await prisma.bag.update({
        where: { id: bag.id },
        data: { items: bag.items as Prisma.BagUpdateitemsInput[], ...calculatePrices(bag.items as BagItem[]) }
      })
      revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))
      return SystemLogger.response(`${product.name} ${existItem ? 'updated in' : 'added to'} bag`, CODE.OK, TAG)
    }
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

export async function getMyBag() {
  const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
  if (!sessionBagId) throw new Error(en.error.sesssion_not_found)

  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  const bag = await prisma.bag.findFirst({ where: userId ? { userId } : { sessionBagId } })
  if (!bag) return undefined

  const myBag = convertToPlainObject({
    ...bag,
    items        : bag.items as BagItem[],
    itemsPrice   : bag.itemsPrice.toString(),
    totalPrice   : bag.totalPrice.toString(),
    shippingPrice: bag.shippingPrice.toString(),
    taxPrice     : bag.taxPrice.toString()
  })

  return myBag
}

/**
 * Retrieves the count of items in the user's bag.
 *
 * This function asynchronously fetches the user's bag and calculates the total quantity
 * of items present in the bag. If the bag is not found, it returns 0.
 *
 * @returns {Promise<number>} A promise that resolves to the total count of items in the bag.
 */
export async function getMyBagCount() {
  const bag = await getMyBag()
  if (!bag) return 0
  return (bag.items as BagItem[]).reduce((acc, item) => acc + item.qty, 0)
}

export async function removeItemFromBag(productId: string) {
  try {
    const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
    if (!sessionBagId) throw new Error(en.error.sesssion_not_found)

    const product = await prisma.product.findFirst({ where: { id: productId } })
    if (!product) throw new Error(en.error.product_not_found)

    const bag = await getMyBag()
    if (!bag) throw new Error(en.error.bag_not_found)

    const exist = (bag.items as BagItem[]).find((x) => x.productId === productId)
    if (!exist) throw new Error(en.error.item_not_found)

    if (exist.qty === 1) {
      bag.items = (bag.items as BagItem[]).filter((x) => x.productId !== exist.productId)
    } else {
      const item = (bag.items as BagItem[]).find((x) => x.productId === productId)
      if (item) item.qty = exist.qty - 1
    }

    await prisma.bag.update({
      where: { id: bag.id },
      data: { items: bag.items as Prisma.BagUpdateitemsInput[], ...calculatePrices(bag.items as BagItem[]) }
    })

    revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))
    return SystemLogger.response(`${product.name} was removed from bag`, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
