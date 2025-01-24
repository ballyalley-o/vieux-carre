'use server'
import { prisma } from 'db/prisma'
import { GLOBAL } from 'vieux-carre'
import { convertToPlainObject } from 'lib'



export async function getLatestProducts() {
  const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, orderBy: { createdAt: 'desc' } })
  return convertToPlainObject(data)
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug } })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAllProducts({ query, limit = GLOBAL.PAGE_SIZE, page, category }: AppProductsAction<number>) {
  const data  = await prisma.product.findMany({ skip: (page - 1) * limit, take: limit })
  const count = await prisma.product.count()

  const summary = { data, totalPages: Math.ceil(count / limit)}
  return summary
}