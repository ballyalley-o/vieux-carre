import { z } from 'zod'
import { CartItemSchema } from './cart-item-schema'
import { currency } from './product-schema'

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session cart id is required'),
  userId: z.string().optional().nullable()
})
