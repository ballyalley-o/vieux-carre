import { GLOBAL } from 'vieux-carre'
import ws from 'ws'
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

      neonConfig.webSocketConstructor = ws
const connectionString                = String(GLOBAL.DB_URI)
const poolConfig                      = { connectionString }
const adapter                         = new PrismaNeon(poolConfig)

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString()
        }
      },
      rating: {
        compute(product) {
          return product.rating.toString()
        }
      }
    },
    bag: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(bag) {
          return bag.itemsPrice.toString()
        }
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(bag) {
          return bag.taxPrice.toString()
        }
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(bag) {
          return bag.shippingPrice.toString()
        }
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(bag) {
          return bag.totalPrice.toString()
        }
      }
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(bag) {
          return bag.itemsPrice.toString()
        }
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(bag) {
          return bag.taxPrice.toString()
        }
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(bag) {
          return bag.shippingPrice.toString()
        }
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(bag) {
          return bag.totalPrice.toString()
        }
      }
    },
    orderItem: {
      price: {
        compute(bag) {
          return bag.price.toString()
        }
      }
    }
  }
})
