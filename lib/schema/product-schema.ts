import { z } from 'zod'
import { formatNumberWithDecimal } from 'lib/util'

const currency = z.string().refine((num) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(num))), 'Price must have exactly 2 decimal places')

export const ProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(255),
  slug: z.string().min(5, 'Slug must be at least 5 characters').max(255),
  category: z.string().min(5, 'Category must be at least 5 characters').max(255),
  brand: z.string().min(5, 'Brand must be at least 5 characters').max(255),
  description: z.string().min(5, 'Slug must be at least 5 characters').max(255),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must be at least 1 image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency
})