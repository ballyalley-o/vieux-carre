import { z } from 'zod'

export const ShippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Name is too short, it should not be less than 3 characters')
    .max(50, 'Name is too long, it should not be more than 50 characters'),
  streetAddress: z.string().min(3, 'Address is too short, it should not be less than 3 characters'),
  city         : z.string().min(2, 'City is too short, it should not be less than 3 characters'),
  postalCode   : z.string().min(3, 'Postal Code is too short, it should not be less than 3 characters'),
  country      : z.string().min(3, 'Country is too short, it should not be less than 3 characters'),
  latitude     : z.string().optional(),
  longitude    : z.string().optional()
})
