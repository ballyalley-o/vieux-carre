'use server'
import { auth } from 'auth'
import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { prisma } from 'db/prisma'
import { paypal } from 'lib/paypal'
import { CODE } from 'lib/constant'
import { OrderSchema } from 'lib/schema'
import { SystemLogger } from 'lib/app-logger'
import { convertToPlainObject } from 'lib/util'
import { PATH_DIR } from 'config'
import { getUserById } from './user.action'
import { getMyBag } from './bag.action'

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
    return SystemLogger.response(`${en.success.order_created} - ${createdOrderId}`, CODE.CREATED, TAG, PATH_DIR.ORDER_VIEW(createdOrderId))
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findFirst({ where: { id: orderId }, include: { orderitems: true, user: { select: { name: true, email: true }}} })
    return convertToPlainObject(order)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.NOT_FOUND, TAG)
  }
}

export async function createPayPalOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({ where: { id: orderId }})
    if (order) {
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice));
      await prisma.order.update({ where: { id: orderId }, data: { paymentResult: { id: paypalOrder.id, email_address: '', status: '', pricePaid: 0 }}})
      return SystemLogger.response(en.success.order_created, CODE.CREATED, TAG, undefined, paypalOrder.id)
    } else {
      throw new Error(en.error.order_not_found)
    }
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

export async function approvePayPalOrder(orderId: string, data: { orderID: string }) {
  try {
    const order = await prisma.order.findFirst({ where: { id: orderId }})
    if (!order) throw new Error(en.error.order_not_found)
    const captureData = await paypal.capturePayment(data.orderID)
   if (!captureData || captureData.id !== (order.paymentResult as PaymentResult)?.id || captureData.status !== 'COMPLETED') {
      throw new Error(en.error.paypal_payment_error)
   }

   await updateOrderToPaid({
    orderId,
    paymentResult: {
      id           : captureData.id,
      status       : captureData.status,
      email_address: captureData.payer.email_address,
      pricePaid    : captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
    },
  });
   revalidatePath(PATH_DIR.ORDER_VIEW(orderId))
   return SystemLogger.response(en.success.order_paid)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

export async function updateOrderToPaid({ orderId, paymentResult }: { orderId: string, paymentResult?: PaymentResult }) {
  const order = await prisma.order.findFirst({ where: { id: orderId }, include: { orderitems: true }})
  if (!order) throw new Error(en.error.order_not_found)
  if (order.isPaid) throw new Error(en.error.order_paid)
  await prisma.$transaction(async (tx) => {
    for (const item of order.orderitems) {
      await tx.product.update({ where: { id: item.productId }, data: { stock: { increment: -item.qty }}})
    }
    await tx.order.update({ where: { id: orderId }, data: { isPaid: true, paidAt: new Date(), paymentResult }})
  })
  const updatedOrder = await prisma.order.findFirst({ where: { id: orderId }, include: { orderitems: true, user: { select: { name: true, email: true }} }})
  if (!updatedOrder) throw new Error(en.error.order_not_found)
}

export async function getMyOrders({ limit = GLOBAL.PAGE_SIZE, page }: AppPagination) {
  const session = await auth()
  if (!session) throw new Error(en.error.user_not_authenticated)
  const orders = await prisma.order.findMany({ where: { userId: session?.user?.id}, orderBy:{ createdAt:'desc' }, take: limit, skip: (page - 1) * limit })

  const dataCount = await prisma.order.count({ where: {userId: session?.user?.id }})
  return { orders, totalPages: Math.ceil( dataCount / limit )}
}

/**
 * Retrieves a summary of orders, including counts, total sales, sales data by month, and latest sales.
 *
 * @returns {Promise<{
 *   count: { orders: number; products: number; user: number };
 *   totalSales: { _sum: { totalPrice: number | null } };
 *   salesData: Array<{ month: string; totalSales: number }>;
 *   latestSales: Array<{ createdAt: Date; user: { name: string } }>;
 * }>} A promise that resolves to an object containing the summary report.
 */
export async function getOrderSummary() {
 /**
  * count
  */
  const orders               = await prisma.order.count()
  const products             = await prisma.product.count()
  const users                 = await prisma.user.count()
  const count                = { orders, products, users }
  /**
   * data
   */
  const totalSales           = await prisma.order.aggregate({ _sum: { totalPrice: true } })
  const rawSalesData         = await prisma.$queryRaw<Array<{month:string; totalSales: Prisma.Decimal}>>`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`
  const salesData: SalesData = rawSalesData.map(entry => ({ month: entry.month, totalSales: Number(entry.totalSales) }))
  /**
   * latest sales
   */
  const latestSales          = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true }}}, take: 6 })

  const summary = { count, totalSales, salesData, latestSales }

  return summary
}

/**
 * Retrieves a paginated list of orders from the database.
 *
 * @param {AppPagination} param0 - The pagination parameters.
 * @param {number} [param0.limit=GLOBAL.PAGE_SIZE] - The number of orders to retrieve per page.
 * @param {number} param0.page - The current page number.
 * @returns {Promise<{ data: Order[], totalPages: number }>} A promise that resolves to an object containing the list of orders and the total number of pages.
 */
export async function getAllOrders({ limit = GLOBAL.PAGE_SIZE, page }: AppPagination) {
 const data      = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: limit, skip: (page - 1) * limit, include: { user: { select: { name: true }}} })
 const dataCount = await prisma.order.count()
 const summary   = { data, totalPages: Math.ceil( dataCount / limit ) }

 return summary
}
