'use server'

// import { GLOBAL } from 'vieux-carre'
import { PromotionType } from 'vieux-carre.authenticate/generated'
// import { S3Client } from '@aws-sdk/client-s3'
import { prisma } from 'db/prisma'
import { cache } from 'lib/cache'
import { CACHE_KEY, CACHE_TTL } from 'config/cache.config'
import { convertToPlainObject, transl } from 'lib'

// const _TAG = 'PROMOTION.ACTION'
// const s3 = new S3Client({
//     region: GLOBAL.AWS.AWS_REGION!,
//     credentials: {
//         accessKeyId    : GLOBAL.AWS.AWS_ACCESS_KEY_ID,
//         secretAccessKey: GLOBAL.AWS.AWS_SECRET_ACCESS_KEY
//     }
// })

/**
 * Fetches the promotions from the database.
 *
 * This function retrieves all of the promotions
 * from the database, ordered by their creation date in ascending order.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of plain objects
 * representing the promotions.
 */
export async function getPromotions() {
    try {
     return cache({
       key    : CACHE_KEY.promotions,
       ttl    : CACHE_TTL.promotions,
       fetcher: async () => {
         const data = await prisma.promotion.findMany({ orderBy: { type: 'asc' } })
         return convertToPlainObject(data)
       }
     })
    } catch (error) {
      console.error('Error: ', error)
      throw new Error((error as AppError).message)
    }
}

/**
 * Fetches the promotions by given type from the database.
 *
 * This function retrieves all promotions by the specified type
 * from the database, ordered by their creation date in ascending order.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of plain objects
 * representing the promotions by tpye.
 */
export async function getPromotionsByType(type: PromotionType) {
    try {
     return cache({
       key    : CACHE_KEY.promotionsByType(type),
       ttl    : CACHE_TTL.promotionsByType,
       fetcher: async () => {
         const data = await prisma.promotion.findMany({ where: { type }, orderBy: { type: 'asc' } })
         return convertToPlainObject(data)
       }
     })
    } catch (error) {
      console.error('Error: ', error)
      throw new Error((error as AppError).message)
    }
}

export async function getDealOfTheMonth() {
  try {
   return cache({
     key    : CACHE_KEY.promotionDOTM,
     ttl    : CACHE_TTL.promotionDOTM,
     fetcher: async () => {
       const data = await prisma.promotion.findFirst({ where: { type: PromotionType.DOTM, isActive: true } })
       return convertToPlainObject(data)
     }
   })
  } catch (error) {
    console.error('Error: ', error)
    throw new Error((error as AppError).message)
  }
}

export async function getDealOfTheMonthProduct() {
  try {
   return cache({
     key    : CACHE_KEY.promotionDOTM,
     ttl    : CACHE_TTL.promotionDOTM,
     fetcher: async () => {
       const promotion = await prisma.promotion.findFirst({ where: { type: PromotionType.DOTM, isActive: true } })
       if (!promotion?.productId) throw new Error(transl('error.no_existing_item'))

       const product = await prisma.product.findUnique({ where: { id: promotion?.productId } })
       return convertToPlainObject(product)
     }
   })
  } catch (error) {
    console.error('Error: ', error)
    throw new Error((error as AppError).message)
  }
}

export async function getDealOfTheMonthProductSlug() {
  try {
   return cache({
     key    : CACHE_KEY.promotionDOTM,
     ttl    : CACHE_TTL.promotionDOTM,
     fetcher: async () => {
       const promotion = await prisma.promotion.findFirst({ where: { type: PromotionType.DOTM, isActive: true } })
       if (!promotion?.productId) throw new Error(transl('error.no_existing_item'))

       const product = await prisma.product.findUnique({ where: { id: promotion?.productId } })
       return convertToPlainObject({ slug: product?.slug })
     }
   })
  } catch (error) {
    console.error('Error: ', error)
    throw new Error((error as AppError).message)
  }
}




