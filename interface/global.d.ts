import { z, ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { CODE, ProductSchema, CartSchema, CartItemSchema } from 'lib'

declare global {
  export interface Product extends z.infer<typeof ProductSchema> {
    id: number
    rating: string
    createdAt: Date
  }

  export type Cart = z.infer<typeof CartSchema>
  export type CartItem = z.infer<typeof CartItemSchema>

  export interface ReadonlyReactNode {
    children: Readonly<{ children: ReactNode }>
  }

  export interface ResponseMessage {
    code: CODE
    success: boolean
    message: string
  }

  export type AppError =
    | ZodError
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientValidationError
}
