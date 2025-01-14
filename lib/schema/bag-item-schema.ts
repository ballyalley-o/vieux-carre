import { z } from 'zod'
import { currency } from './product-schema'

export const BagItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name     : z.string().min(1, 'Name is required'),
  slug     : z.string().min(1, 'Slug is required'),
  qty      : z.number().int().nonnegative('Quantity must be is a positive number'),
  image    : z.string().min(1, 'Image is required'),
  price    : currency
})
