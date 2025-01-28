import { z } from 'zod'

export const UpdateUserSchema = z.object({
  name : z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().min(3, 'Email must be at least 3 characters')
})

export const UpdateUserAccountSchema = UpdateUserSchema.extend({
  id       : z.string().min(1, 'User id must be at least 1 character'),
  role     : z.string().min(1, 'Role is required'),
  updatedAt: z.date().nullable(),
})