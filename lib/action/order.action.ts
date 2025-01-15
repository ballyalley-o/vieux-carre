'use server'
import { auth } from 'auth'
import { en } from 'public/locale'
import { prisma } from 'db/prisma'
import { SystemLogger } from 'lib/app-logger'
import { CODE } from 'lib/constant'
import { getUserById } from './user.action'
import { getMyBag } from './bag.action'
import { PATH_DIR } from 'config'
import { OrderSchema } from 'lib/schema'

const TAG = 'ORDER.ACTION'
export async function createOrder() {
  try {
    const session = await auth()
    if (!session) throw new Error(en.error.user_not_authenticated)
    const bag = await getMyBag()
    const userId = session?.user?.id
    if (!userId) throw new Error(en.error.user_not_found)
    const user = await getUserById(userId)

    if (!bag || bag.items.length === 0) {
      return SystemLogger.errorResponse(en.error.bag_empty, CODE.BAD_REQUEST, TAG, PATH_DIR.BAG)
    }

    if (!user.address) {
      return SystemLogger.errorResponse(en.error.no_shipping_address, CODE.BAD_REQUEST, TAG, PATH_DIR.SHIPPING)
    }

    if (!user.paymentMethod) {
      return SystemLogger.errorResponse(en.error.no_payment_method, CODE.BAD_REQUEST, TAG, PATH_DIR.PAYMENT)
    }

    const order = OrderSchema.parse({
        userId         : user.id,
        shippingAddress: user.address,
        paymentMethod  : user.paymentMethod,
        itemsPrice     : bag.itemsPrice,
        shippingPrice  : bag.shippingPrice,
        taxPrice       : bag.taxPrice,
        totalPrice     : bag.totalPrice
    })

    const createdOrderId = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({ data: order })
        // create order items from bag items
        for (const item of bag.items as BagItem[]) {
            await tx.orderItem.create({ data: { ...item, price: item.price, orderId: createdOrder.id } })
        }
        // clear bag
        const clearedBag = { items: [], totalPrice: 0, taxPrice: 0, shippingPrice: 0, itemsPrice: 0 }
        await tx.bag.update({ where: { id: bag.id }, data: clearedBag })
        return createdOrder.id
    })
    if (!createdOrderId) throw new Error(en.error.order_not_created)
    return SystemLogger.response(en.success.order_created, CODE.CREATED, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
export async function getOrderById() {
  try {
    const session = await auth()
    if (!session) throw new Error(en.error.user_not_authenticated)
    const userId = session?.user?.id
    if (!userId) throw new Error(en.error.user_not_found)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
