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
/**
 * Creates a new order for the authenticated user.
 *
 * This function performs the following steps:
 * 1. Authenticates the user.
 * 2. Retrieves the user's bag.
 * 3. Validates the user's ID, address, and payment method.
 * 4. Parses the order data using the OrderSchema.
 * 5. Creates the order and order items in a database transaction.
 * 6. Clears the user's bag.
 * 7. Returns a success response with the created order ID.
 *
 * @returns {Promise<SystemLogger.Response>} A promise that resolves to a success response with the created order ID,
 * or an error response if any step fails.
 *
 * @throws {Error} If the user is not authenticated, user ID is not found, bag is empty, no shipping address, no payment method,
 * or order creation fails.
 */
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

/**
 * Retrieves an order by its ID from the database.
 *
 * @param {string} orderId - The unique identifier of the order to retrieve.
 * @returns {Promise<any>} A promise that resolves to the order object, including its items and user details, or an error response if the order is not found.
 * @throws {AppError} If an error occurs while retrieving the order.
 */
export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findFirst({ where: { id: orderId }, include: { orderitems: true, user: { select: { name: true, email: true }}} })
    return convertToPlainObject(order)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.NOT_FOUND, TAG)
  }
}

/**
 * Creates a PayPal order for the given order ID.
 *
 * @param {string} orderId - The ID of the order to create a PayPal order for.
 * @returns {Promise<SystemLogger>} - The result of the PayPal order creation.
 * @throws {Error} - Throws an error if the order is not found.
 */
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

/**
 * Approves a PayPal order by capturing the payment and updating the order status to paid.
 *
 * @param {string} orderId - The ID of the order to approve.
 * @param {Object} data - The data containing the PayPal order ID.
 * @param {string} data.orderID - The PayPal order ID to capture payment for.
 * @returns {Promise<any>} - A promise that resolves to a success response if the order is approved and paid, or an error response if an error occurs.
 * @throws {Error} - Throws an error if the order is not found or if there is an issue with the PayPal payment.
 */
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

/**
 * Updates the order status to paid and adjusts the stock of the ordered items.
 *
 * @param {Object} params - The parameters for updating the order.
 * @param {string} params.orderId - The ID of the order to be updated.
 * @param {PaymentResult} [params.paymentResult] - The result of the payment process.
 *
 * @throws {Error} If the order is not found.
 * @throws {Error} If the order is already paid.
 *
 * @returns {Promise<void>} A promise that resolves when the order is successfully updated.
 */
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


/**
 * Deletes an order by its ID.
 *
 * @param {string} orderId - The ID of the order to delete.
 * @returns {Promise<any>} - A promise that resolves to the response of the deletion operation.
 * @throws {AppError} - Throws an error if the deletion operation fails.
 */
export async function deleteOrder(orderId: string) {
  try {
    await prisma.order.delete({ where: { id: orderId }})
    revalidatePath(PATH_DIR.ADMIN.ORDER)
    return SystemLogger.response(en.success.order_deleted, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates a Cash on Delivery (COD) order to a paid status.
 *
 * This function attempts to update the specified order to a paid status
 * and revalidates the order view path. If the operation is successful,
 * it logs a success response. If an error occurs, it logs an error response.
 *
 * @param {string} orderId - The unique identifier of the order to be updated.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * @throws {AppError} - Throws an error if the update operation fails.
 */
export async function updateCODOrderToPaid(orderId: string) {
  try {
    await updateOrderToPaid({ orderId })
    revalidatePath(PATH_DIR.ORDER_VIEW(orderId))
    return SystemLogger.response(en.success.order_paid)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Updates the status of an order to delivered.
 *
 * This function performs the following steps:
 * 1. Finds the order by its ID.
 * 2. Checks if the order exists.
 * 3. Checks if the order is paid.
 * 4. Updates the order's status to delivered and sets the delivery date.
 * 5. Revalidates the order view path.
 * 6. Logs and returns a success response.
 *
 * @param {string} orderId - The ID of the order to update.
 * @returns {Promise<SystemLogger>} - A promise that resolves to a success response or an error response.
 * @throws {Error} - Throws an error if the order is not found or not paid.
 */
export async function updateOrderToDelivered(orderId: string) {
  try {
    const order = await prisma.order.findFirst({ where: { id: orderId }})
    if (!order) throw new Error(en.error.order_not_found)
    if (!order.isPaid) throw new Error(en.error.order_not_paid)
    await prisma.order.update({ where: { id: orderId}, data: { isDelivered: true, deliveredAt: new Date() }})
    revalidatePath(PATH_DIR.ORDER_VIEW(orderId))
    return SystemLogger.response(en.success.order_delivered)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}