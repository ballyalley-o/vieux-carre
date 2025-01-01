import { z } from 'zod'
import { ProductSchema } from 'lib'

declare global {}

declare global {
  export interface Product extends z.infer<typeof ProductSchema> {
    id: number
    rating: string
    createdAt: Date
  }
}
