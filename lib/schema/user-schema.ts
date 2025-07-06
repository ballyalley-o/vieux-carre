import { z } from 'zod'
import { ShippingAddressSchema } from './shipping-schema'

export const UpdateUserSchema = z.object({
  name   : z.string().min(3, 'Name must be at least 3 characters'),
  email  : z.string().min(3, 'Email must be at least 3 characters'),
  address: ShippingAddressSchema.optional()
})

export const UpdateUserAccountSchema = UpdateUserSchema.extend({
  id       : z.string().min(1, 'User id must be at least 1 character'),
  role     : z.enum(['user', 'admin']),
  updatedAt: z.date().nullable(),
})

export const UpdateUserPasswordSchema = z
  .object({
    oldPassword    : z.string().optional(),
    password       : z.string().min(6, 'Password must be at least 6 characters').optional(),
    confirmPassword: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword || data.oldPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    { message: 'Passwords do not match', path: ['confirmPassword'] }
  )