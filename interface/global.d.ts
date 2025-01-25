import { JSX, ReactNode } from 'react'
import { z, ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { CODE, ProductSchema, BagSchema, BagItemSchema, BagSchema, ShippingAddressSchema, OrderSchema, OrderItemSchema, PaymentResultSchema, UpdateUserSchema, UpdateProductSchema } from 'lib'

declare global {
  export interface UserBase {
    name : string
    email: string
  }

  export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'

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
  export type CreateProduct   = z.infer<typeof ProductSchema>
  export type UpdateProduct   = z.infer<typeof UpdateProductSchema>
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

  export interface AppPagination {
    limit?: number
    page  : number
  }

  export interface AppResponse {
    success    : boolean
    code       : CODE
    message    : string
    redirectTo?: string
    data      ?: unknown
  }

  export interface AppPage<T> { page: T }
  export interface AppOrdersAction<T> extends AppPage<T> { limit?: number }
  export interface AppProductsPage<T> extends AppPage<T> { query: string, category: string }
  export interface AppProductsAction<T> extends AppPage<T> { query: string, category: string, limit?: number }

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

  export type ProductFormType = 'create' | 'update'
  export type ProductForm = {
    type      : ProductFormType,
    product  ?: Product,
    productId?: string
  }

  export enum METHOD {
    GET    = 'get',
    POST   = 'post',
    PATCH  = 'patch',
    PUT    = 'put',
    DELETE = 'delete',
    OPTION = 'option'
  }
}
