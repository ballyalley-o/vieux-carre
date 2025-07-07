'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { GLOBAL } from 'vieux-carre'
import { PATH_DIR } from 'vc.dir'
import { auth } from 'vieux-carre.authenticate'
import { Prisma } from 'vieux-carre.authenticate/generated'
import { prisma } from 'db/prisma'
import { CACHE_KEY } from 'config/cache.config'
import { SystemLogger } from 'lib/app-logger'
import { invalidateCache } from 'lib/cache'
import { BagItemSchema, BagSchema } from 'lib/schema'
import { RESPONSE, CODE, KEY } from 'lib/constant'
import { convertToPlainObject, float2, transl } from 'lib/util'

const { TAX, NO_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } = GLOBAL.PRICES

const TAG = 'BAG.ACTION'

/**
 * Calculates the prices for the items in the bag, including item prices, shipping cost, tax, and total price.
 *
 * @param {BagItem[]} items - An array of items in the bag, where each item has a price and quantity.
 * @returns {Object} An object containing the calculated prices:
 * - `itemsPrice`: The total price of the items, formatted to two decimal places.
 * - `shippingPrice`: The shipping cost, formatted to two decimal places.
 * - `taxPrice`: The tax amount, formatted to two decimal places.
 * - `totalPrice`: The total price including items, shipping, and tax, formatted to two decimal places.
 */
const calculatePrices = (items: BagItem[]) => {
  const itemsPrice    = float2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)),
        shippingPrice = float2(itemsPrice > Number(NO_SHIPPING_THRESHOLD) ? 0 : DEFAULT_SHIPPING_COST),
        taxPrice      = float2(itemsPrice * Number(TAX)),
        totalPrice    = float2(itemsPrice + shippingPrice + taxPrice)

  const prices = {
    itemsPrice   : itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice     : taxPrice.toFixed(2),
    totalPrice   : totalPrice.toFixed(2)
  }
  return prices
}

/**
 * Adds an item to the user's bag.
 *
 * This function handles adding an item to the user's shopping bag. It performs several checks:
 * - Ensures a session bag ID exists.
 * - Retrieves the user's session and ID.
 * - Validates the provided item data against the `BagItemSchema`.
 * - Checks if the product exists and is in stock.
 * - If the bag does not exist, creates a new bag with the item.
 * - If the bag exists, updates the quantity of the existing item or adds the new item.
 * - Revalidates the product view path.
 * - Returns a success response if the item is added or updated successfully.
 *
 * @param {BagItem} data - The item data to add to the bag.
 * @returns {Promise<Response>} - A promise that resolves to a success or error response.
 * @throws {Error} - Throws an error if the session bag ID is not found, the product is not found, or the product is out of stock.
 */
export async function addItemToBag(data: BagItem) {
  try {
    const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
    if (!sessionBagId) throw new Error(transl('error.sesssion_not_found'))
    const session = await auth()
    const userId  = session?.user?.id ? (session.user.id as string) : undefined

    const bag     = await getMyBag()
    const item    = BagItemSchema.parse(data)
    const product = await prisma.product.findFirst({ where: { id: item.productId } })
    if (!product) throw new Error(transl('error.product_not_found'))

    if (!bag) {
      const newBag = BagSchema.parse({
        userId,
        items: [item],
        sessionBagId,
        ...calculatePrices([item])
      })
      await prisma.bag.create({ data: newBag })
      await invalidateCache(CACHE_KEY.myBagId(sessionBagId))
      revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))
      return RESPONSE.SUCCESS(transl('success.product_added', { product: product.name }))
    } else {
      const existItem = (bag.items as BagItem[]).find((x) => x.productId === item.productId)
      if (existItem) {
        //check stock
        if (product.stock < existItem.qty + item.qty) {
          return RESPONSE.ERROR(transl('success.product_added', { product: product.name }), CODE.BAD_REQUEST)
        }
        //increase qty
        const foundItem = (bag.items as BagItem[]).find((x) => x.productId === item.productId)
        if (foundItem) {
          foundItem.qty = existItem.qty + 1
        } else {
          throw new Error(transl('error.no_existing_item'))
        }
      } else {
        //still check stock
        if (product.stock < 1) throw new Error(transl('success.product_added', { product: product.name }))
        bag.items.push(item)
      }
      // save to db whether with stock check or not
      await prisma.bag.update({
        where: { id: bag.id },
        data: { items: bag.items as Prisma.BagUpdateitemsInput[], ...calculatePrices(bag.items as BagItem[]) }
      })
      revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))
      return SystemLogger.response(true, existItem ? transl('success.bag_updated', { product: product.name }) : transl('success.product_added', { product: product.name }), CODE.OK)
    }
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

export async function getMyBag() {
  const sessionBagId = (await cookies()).get(KEY.SESSION_BAG_ID)?.value
  if (!sessionBagId) throw new Error(transl('error.sesssion_not_found'))

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
    if (!sessionBagId) throw new Error(transl('error.sesssion_not_found'))

    const product = await prisma.product.findFirst({ where: { id: productId } })
    if (!product) throw new Error(transl('error.product_not_found'))

    const bag = await getMyBag()
    if (!bag) throw new Error(transl('error.bag_not_found'))

    const exist = (bag.items as BagItem[]).find((x) => x.productId === productId)
    if (!exist) throw new Error(transl('error.item_not_found'))

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
    await invalidateCache(CACHE_KEY.myBagId(sessionBagId))
    revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))
    return SystemLogger.response(true, transl('success.product_removed', { product: product.name }), CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
