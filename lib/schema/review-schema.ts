import { z } from 'zod'

export const ReviewSchema = z.object({
    title      : z.string().min(3, 'Title must be at least 3 characters').max(60),
    description: z.string().min(5, 'Description must be at least 5 characters').max(255),
    productId  : z.string().min(1, 'Product ID is required'),
    userId     : z.string().min(1, 'User ID is required'),
    rating     : z.coerce.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5')
})