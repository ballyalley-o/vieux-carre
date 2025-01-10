import { z, ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { CODE, ProductSchema, BagSchema, BagItemSchema, BagSchema } from 'lib'

declare global {
  export interface Product extends z.infer<typeof ProductSchema> {
    id: number
    rating: string
    createdAt: Date
  }

  export type Bag = z.infer<typeof BagSchema>
  export type BagItem = z.infer<typeof BagItemSchema>

  export interface ReadonlyReactNode {
    children: Readonly<{ children: ReactNode }>
  }

  export interface ResponseMessage {
    code: CODE
    success: boolean
    message: string
  }

   export interface ErrorResponseMessage {
     code: CODE
     success: boolean
     message: AppError | string
   }

  export interface SystemResponse extends ResponseMessage {
    tag?: string
  }

   export interface SystemErrorResponse extends ErrorResponseMessage {
     tag?: string
   }

  export type AppError =
    | ZodError
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientValidationError

}
