import ws from 'ws'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { GLOBAL } from 'config'

neonConfig.webSocketConstructor = ws
const connectionString = `${GLOBAL.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

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
