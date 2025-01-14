import { z } from 'zod'
import { BagItemSchema } from './bag-item-schema'
import { currency } from './product-schema'

export const BagSchema = z.object({
  items        : z.array(BagItemSchema),
  itemsPrice   : currency,
  totalPrice   : currency,
  shippingPrice: currency,
  taxPrice     : currency,
  sessionBagId : z.string().min(1, 'Session bag id is required'),
  userId       : z.string().optional().nullable()
})
