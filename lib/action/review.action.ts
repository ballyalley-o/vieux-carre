'use server'

import { en } from 'public/locale'
import { z } from 'zod'
import { prisma } from 'db/prisma'
import { auth } from 'auth'
import { revalidatePath } from 'next/cache'
import { CODE, ReviewSchema, SystemLogger } from 'lib'
import { PATH_DIR } from 'config'

const TAG = 'REVIEW.ACTION'

/**
 * Creates or updates a review for a product.
 *
 * This function first authenticates the user and then validates the review data.
 * It checks if the product exists and if the user has already reviewed the product.
 * If a review exists, it updates the review; otherwise, it creates a new review.
 * It also updates the product's average rating and the number of reviews.
 * Finally, it revalidates the product view path and logs the success response.
 *
 * @param {Review} data - The review data to be created or updated.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * @throws {Error} - Throws an error if the user is not authenticated or if the product is not found.
 */
export async function createUpdateReview(data: z.infer<typeof ReviewSchema>) {
  try {
    const session = await auth()
    if (!session) throw new Error(en.error.user_not_authenticated)
    const review = ReviewSchema.parse({ ...data, userId: session?.user?.id })
    const product = await prisma.product.findFirst({ where: { id: review.productId } })
    if (!product) throw new Error(en.error.product_not_found)
    const reviewExist = await prisma.review.findFirst({ where: { productId: review.productId, userId: review.userId } })

    await prisma.$transaction(async (tx) => {
      if (reviewExist) {
        await tx.review.update({
          where: { id: reviewExist.id },
          data: { title: review.title, description: review.description, rating: review.rating }
        })
      } else {
        await tx.review.create({ data: review })
      }
      const averateRating = await tx.review.aggregate({ _avg: { rating: true }, where: { productId: review.productId }})
      const numReview     = await tx.review.count({ where: { productId: review.productId}})

      await tx.product.update({ where: { id: review.productId }, data: { rating: averateRating._avg.rating || 0, numReviews: numReview }})
    })

    revalidatePath(PATH_DIR.PRODUCT_VIEW(product.slug))

    return SystemLogger.response(en.success.review_updated, CODE.OK, TAG)
  } catch (error) {
    return SystemLogger.errorResponse(error as AppError, CODE.INTERNAL_SERVER_ERROR, TAG)
  }
}


/**
 * Retrieves reviews for a specific product.
 *
 * @param {Object} params - The parameters for retrieving reviews.
 * @param {string} params.productId - The ID of the product to retrieve reviews for.
 * @returns {Promise<{ data: Array<Object> }>} A promise that resolves to an object containing an array of review data.
 */
export async function getReviews({ productId }: { productId: string }) {
  const data = await prisma.review.findMany({ where: { productId }, include: { user: { select: { name: true } }}, orderBy: { createdAt: 'desc' }})
  return { data }
}

/**
 * Retrieves a review for a specific product by the authenticated user.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.productId - The ID of the product to retrieve the review for.
 * @returns {Promise<Review | null>} The review for the specified product by the authenticated user, or null if no review is found.
 * @throws {Error} If the user is not authenticated.
 */
export async function getReviewByProductId({ productId }: { productId: string }) {
  const session = await auth()
  if (!session) throw new Error(en.error.user_not_authenticated)
  const review = await prisma.review.findFirst({ where: { productId, userId: session?.user?.id }})
  return review
}