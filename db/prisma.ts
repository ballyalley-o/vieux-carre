import ws from 'ws'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { GLOBAL } from 'config'

neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`
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
    }
  }
})
