import { z } from 'zod'
import { currency } from './product-schema'
import { PAYMENT_METHODS } from './payment-schema'
import { ShippingAddressSchema } from './shipping-schema'

export const OrderSchema = z.object({
  userId         : z.string().min(1, 'User is required'),
  itemsPrice     : currency,
  shippingPrice  : currency,
  taxPrice       : currency,
  totalPrice     : currency,
  shippingAddress: ShippingAddressSchema,
  paymentMethod  : z.string().refine((data) => PAYMENT_METHODS.includes(data), { message: 'Invalid payment method' })
})

export const OrderItemSchema = z.object({
  productId: z.string(),
  slug     : z.string(),
  image    : z.string(),
  name     : z.string(),
  qty      : z.number(),
  price    : currency,
})
