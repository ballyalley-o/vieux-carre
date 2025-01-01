'use server'
import { PrismaClient } from '@prisma/client'
import { GLOBAL } from 'config'
import { convertToPlainObject } from 'lib'

export async function getLatestProducts() {
  const prisma = new PrismaClient()
  const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, orderBy: { createdAt: 'desc' } })

  return convertToPlainObject(data)
}
