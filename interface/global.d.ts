import { z } from 'zod'
import { ProductSchema } from 'lib'

declare global {
  export interface Product extends z.infer<typeof ProductSchema> {
    id: number
    rating: string
    createdAt: Date
  }

  export interface ReadonlyReactNode {
    children: Readonly<{ children: ReactNode }>
  }
}
