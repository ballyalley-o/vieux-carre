'use server'

import { GLOBAL } from 'vieux-carre'
import { Prisma } from 'vieux-carre.authenticate/generated'
import { revalidatePath } from 'next/cache'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { prisma } from 'db/prisma'
import { cache, invalidateCache } from 'lib/cache'
import { CACHE_KEY, CACHE_TTL } from 'config/cache.config'
import { CODE, KEY, convertToPlainObject, ProductSchema, SystemLogger, UpdateProductSchema, transl } from 'lib'
import { PATH_DIR } from 'config'

const TAG = 'PRODUCT.ACTION'
const s3 = new S3Client({
    region: GLOBAL.AWS.AWS_REGION!,
    credentials: {
        accessKeyId    : GLOBAL.AWS.AWS_ACCESS_KEY_ID,
        secretAccessKey: GLOBAL.AWS.AWS_SECRET_ACCESS_KEY
    }
})

type ImageArr   = { currentImages: string[]; index: number }
type ImageSolo  = { currentImages: string }
type ImageInput = ImageArr | ImageSolo

export async function deleteProductImage(args: ImageInput) {
  const getFileKeyFromUrl = (url: string) => {
    try {
      const urlParts = url?.split('/')
      const keyParts = urlParts.slice(3)
      return keyParts.join('/')
    } catch (error) {
      console.error('Error extracting the file Key: ', error)
      return null
    }
  }

  const imageToDelete = 'index' in args ? args.currentImages[args.index] : args.currentImages
  const fileKey       = getFileKeyFromUrl(imageToDelete)

  if (!fileKey) return { succes: false, error: 'Invalid file key' }
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: GLOBAL.AWS.S3_BUCKET_NAME,
        Key: fileKey
      })
    )
    return { success: true }
  } catch (error) {
    console.error(transl('error.unable_delete'), error)
    return { success: false, error }
  }
}

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
 try {
  return cache({
    key    : CACHE_KEY.featuredProducts,
    ttl    : CACHE_TTL.featuredProducts,
    fetcher: async () => {
      const data = await prisma.product.findMany({ take: GLOBAL.LATEST_PRODUCT_QUANTITY, where: { stock: { gt: 0 } }, orderBy: { createdAt: 'desc' } })
      return convertToPlainObject(data)
    }
  })
 } catch (error) {
   console.error('Error: ', error)
   throw new Error((error as AppError).message)
 }
}

/**
 * Retrieves a product by its slug.
 *
 * @param {string} slug - The slug of the product to retrieve.
 * @returns {Promise<Product | null>} A promise that resolves to the product if found, or null if not found.
 */
export async function getProductBySlug(slug: string) {
 return cache({
  key    : CACHE_KEY.productBySlug(slug),
  ttl    : CACHE_TTL.productBySlug,
  fetcher: async () => {
    return await prisma.product.findFirst({ where: { slug } })
  }
 })
}

export async function getProductById(productId: string) {
 return cache({
  key    : CACHE_KEY.productById(productId),
  ttl    : CACHE_TTL.productById,
  fetcher: async () => {
    const data = await prisma.product.findFirst({ where: { id: productId } })
    return convertToPlainObject(data)
  }
 })
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
export async function getAllProducts({ query, limit = GLOBAL.PAGE_SIZE, page, category, price, rating, sort }: AppProductsAction<number>) {
  return cache({
    key    : CACHE_KEY.products(page),
    ttl    : CACHE_TTL.products,
    fetcher: async () => {
      const queryFilter: Prisma.ProductWhereInput =
        query && query !== KEY.ALL ? { name: { contains: query, mode: 'insensitive' } as Prisma.StringFilter } : {}
      const categoryFilter = category && category !== KEY.ALL ? { category } : {}
      const priceFilter: Prisma.ProductWhereInput =
        price && price !== KEY.ALL ? { price: { gte: Number(price.split('-')[0]), lte: Number(price.split('-')[1]) } } : {}
      const ratingFilter = rating && rating !== KEY.ALL ? { rating: { gte: Number(rating) } } : {}

      const data = await prisma.product.findMany({
        where: { ...queryFilter, ...categoryFilter, ...priceFilter, ...ratingFilter },
        orderBy:
          sort === KEY.LOWEST
            ? { price: 'asc' }
            : sort === KEY.HIGHEST
              ? { price: 'desc' }
              : sort === KEY.RATING
                ? { rating: 'desc' }
                : { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      })
      const count = await prisma.product.count({ where: { ...queryFilter } })

      const summary = { data, totalPages: Math.ceil(count / limit) }
      return convertToPlainObject(summary)
    }
  })
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
    await prisma.product.delete({ where: { id: productId } })
    await invalidateCache(CACHE_KEY.productById(productId))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(true, transl('success.product_deleted'), CODE.OK)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}


/**
 * Creates a new product using the provided data.
 *
 * @param {CreateProduct} data - The data for the new product.
 * @returns {Promise<any>} The created product or an error response.
 *
 * @throws {AppError} If there is an error during product creation.
 */
export async function createProduct(data: CreateProduct) {
  try {
    const product    = ProductSchema.parse(data)
    const newProduct = await prisma.product.create({ data: product })
    await invalidateCache(CACHE_KEY.productById(newProduct.id))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(true, transl('success.product_created'), CODE.CREATED, product)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}


/**
 * Updates an existing product in the database.
 *
 * @param {UpdateProduct} data - The data to update the product with.
 * @returns {Promise<SystemLogger>} - A promise that resolves to a SystemLogger response.
 * @throws {Error} - Throws an error if the product is not found or if there is a validation error.
 */
export async function updateProduct(data:UpdateProduct) {
  try {
    const product       = UpdateProductSchema.parse(data)
    const productExists = await prisma.product.findFirst({ where: { id: product.id }})
    if (!productExists) throw new Error(transl('error.product_not_found'))
    const updatedProduct = await prisma.product.update({ where: {id: product.id }, data: product })
    await invalidateCache(CACHE_KEY.productById(updatedProduct.id))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(true, transl('success.product_updated'), CODE.OK, product)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}

/**
 * Retrieves all product categories along with the count of products in each category.
 *
 * @returns {Promise<Array<{ category: string, _count: number }>>} A promise that resolves to an array of objects,
 * each containing a category and the count of products in that category.
 */
export async function getAllCategories() {
  return cache({
    key    : CACHE_KEY.categories,
    ttl    : CACHE_TTL.categories,
    fetcher: async () => {
      const products = await prisma.product.groupBy({ by: ['category'], _count: true })
      return products
    }
  })
}

/**
 * Retrieves all featured products from the database.
 *
 * This function fetches up to 4 products that are marked as featured,
 * ordered by their creation date in descending order.
 *
 * @returns {Promise<Product[]>} A promise that resolves to an array of Product representing the featured products.
 */
export async function getAllFeaturedProducts() {
  return cache({
    key    : CACHE_KEY.featuredProducts,
    ttl    : CACHE_TTL.featuredProducts,
    fetcher: async () => {
      const products = await prisma.product.findMany({ where: { isFeatured: true }, orderBy: { createdAt: 'desc' }, take: 4 })
      return convertToPlainObject(products)
    }
  })
}


export async function setDealOfTheMonth(productId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.updateMany({ where: { isDotm: true }, data: { isDotm: false }})
      await tx.product.update({ where: { id: productId }, data: { isDotm: true } })
    })
    await invalidateCache(CACHE_KEY.productById(productId))
    revalidatePath(PATH_DIR.ADMIN.PRODUCT)
    return SystemLogger.response(true, transl('success.dotm_updated'))
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.BAD_REQUEST, TAG)
  }
}