'use server'
import { en } from 'public/locale'
import { prisma } from 'db/prisma'
import { GLOBAL } from 'vieux-carre'
import { CODE, convertToPlainObject, SystemLogger } from 'lib'
import { revalidatePath } from 'next/cache'
import { PATH_DIR } from 'config'

const TAG = 'PRODUCT.ACTION'


/**
 * Fetches the latest products from the database.
 *
 * This function retrieves a specified number of the most recently created products
 * from the database, ordered by their creation date in descending order.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of plain objects
 * representing the latest products.
 */
export async function getLatestProducts() {
  const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, orderBy: { createdAt: 'desc' } })
  return convertToPlainObject(data)
}

/**
 * Retrieves a product by its slug.
 *
 * @param {string} slug - The slug of the product to retrieve.
 * @returns {Promise<Product | null>} A promise that resolves to the product if found, or null if not found.
 */
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug } })
}

/**
 * Retrieves a paginated list of products from the database.
 *
 * @param {Object} params - The parameters for retrieving products.
 * @param {string} params.query - The search query for filtering products.
 * @param {number} [params.limit=GLOBAL.PAGE_SIZE] - The number of products to retrieve per page.
 * @param {number} params.page - The current page number.
 * @param {string} params.category - The category to filter products by.
 * @returns {Promise<Object>} A promise that resolves to an object containing the product data and total pages.
 * @property {Array} data - The list of products.
 * @property {number} totalPages - The total number of pages.
 */
export async function getAllProducts({ query, limit = GLOBAL.PAGE_SIZE, page, category }: AppProductsAction<number>) {
  const data = await prisma.product.findMany({ skip: (page - 1) * limit, take: limit })
  const count = await prisma.product.count()

  const summary = { data, totalPages: Math.ceil(count / limit) }
  return summary
}

/**
 * Deletes a product by its ID.
 *
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<SystemLogger>} - The result of the deletion operation.
 * @throws {Error} - Throws an error if the product is not found.
 */
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
