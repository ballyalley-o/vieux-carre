'use server'
import { prisma } from 'db/prisma'
import { GLOBAL } from 'config'
import { convertToPlainObject } from 'lib'

export async function getLatestProducts() {
  const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, orderBy: { createdAt: 'desc' } })
  return convertToPlainObject(data)
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug } })
}
