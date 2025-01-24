'use server'
import { en } from 'public/locale'
import { prisma } from 'db/prisma'
import { GLOBAL } from 'vieux-carre'
import { CODE, convertToPlainObject, SystemLogger } from 'lib'
import { revalidatePath } from 'next/cache'
import { PATH_DIR } from 'config'

const TAG = 'PRODUCT.ACTION'
export async function getLatestProducts() {
  const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, orderBy: { createdAt: 'desc' } })
  return convertToPlainObject(data)
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug } })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAllProducts({ query, limit = GLOBAL.PAGE_SIZE, page, category }: AppProductsAction<number>) {
  const data = await prisma.product.findMany({ skip: (page - 1) * limit, take: limit })
  const count = await prisma.product.count()

  const summary = { data, totalPages: Math.ceil(count / limit) }
  return summary
}

export async function deleteProduct(productId: string) {
  try {
    const productExist = await prisma.product.delete({ where: { id: productId } })
    if (!productExist) throw new Error(en.error.product_not_found)
    await prisma.product.delete({ where: { id: productId } })

    revalidatePath(PATH_DIR.ADMIN.PRODUCT)

   return SystemLogger.response(en.success.product_deleted, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}
