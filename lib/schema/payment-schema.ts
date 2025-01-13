import { z } from "zod"
import { en } from "public/locale"
import { GLOBAL } from "config"

export const PAYMENT_METHODS = GLOBAL.PAYMENT_METHODS && GLOBAL.PAYMENT_METHODS.split(';') || ['PayPal', 'Stripe', 'Cash']

export const PaymentMethodSchema = z.object({
    type: z.string().min(1, 'Payment method is required')
}).refine((data) => PAYMENT_METHODS.includes(data.type), { path:['type'], message: en.error.invalid_payment_method })