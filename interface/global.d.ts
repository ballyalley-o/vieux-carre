import { z, ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { CODE, ProductSchema, BagSchema, BagItemSchema, BagSchema, ShippingAddressSchema, OrderSchema, OrderItemSchema, PaymentResultSchema, UpdateUserSchema } from 'lib'

declare global {
  export interface UserBase {
    name : string
    email: string
  }

  export interface Product extends z.infer<typeof ProductSchema> {
    id       : number
    rating   : string
    createdAt: Date
  }
  export interface Order extends z.infer<typeof OrderSchema>  {
    id         : string
    createdAt  : Date
    isPaid     : boolean
    paidAt     : Date | null
    isDelivered: boolean
    deliveredAt: Date | null
    orderitems : OrderItem[]
    user       : { name: string, email: string }
  }

  export type Bag             = z.infer<typeof BagSchema>
  export type BagItem         = z.infer<typeof BagItemSchema>
  export type ShippingAddress = z.infer<typeof ShippingAddressSchema>
  export type OrderItem       = z.infer<typeof OrderItemSchema>
  export type PaymentResult   = z.infer<typeof PaymentResultSchema>
  export type UpdateUser      = z.infer<typeof UpdateUserSchema>
  export type SalesData       = { month: string, totalSales: number }[]

  export interface TblCell {
    id   : string
    value: string | JSX.Element | number | ReactNode
    align: string
  }


  export interface TblCells<T extends number> {
    cells: TblCell[] & { length: T }
  }

  export interface PayPalOrderID {
    data    : { orderID: string }
    orderId?: string
  }

  export interface ReadonlyReactNode {
    children: Readonly<{ children: ReactNode }>
  }

  export interface ResponseMessage {
    code   : CODE
    success: boolean
    message: string
  }

  export interface ErrorResponseMessage {
    code   : CODE
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


  export type ButtonVariant = 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link' | null | undefined
  export type BadgeVariant  = "default" | "destructive" | "outline" | "secondary" | null | undefined
  export type ButtonType    = 'submit' | 'button' | 'reset' | undefined

  export enum METHOD {
    GET    = 'get',
    POST   = 'post',
    PATCH  = 'patch',
    PUT    = 'put',
    DELETE = 'delete',
    OPTION = 'option'
  }
}
