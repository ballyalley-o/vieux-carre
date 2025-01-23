import { GLOBAL } from "vieux-carre"
import { en } from "public/locale"
import { z } from "zod"
import { KEY } from "lib/constant"

export const PAYMENT_METHODS = GLOBAL.PAYMENT_METHODS && GLOBAL.PAYMENT_METHODS.split(';') || ['PayPal', 'Stripe', 'CashOnDelivery']

export const PAYPAL           = PAYMENT_METHODS?.find((method) => method === 'PayPal') || KEY.PAYPAL
export const STRIPE           = PAYMENT_METHODS?.find((method) => method === 'Stripe') || KEY.STRIPE
export const CASH_ON_DELIVERY = PAYMENT_METHODS?.find((method) => method === 'CashOnDelivery') || KEY.CASH_ON_DELIVERY

export const PaymentMethodSchema = z.object({
    type: z.string().min(1, 'Payment method is required')
}).refine((data) => PAYMENT_METHODS.includes(data.type), { path:['type'], message: en.error.invalid_payment_method })

export const PaymentResultSchema = z.object({
    id           : z.string(),
    status       : z.string(),
    email_address: z.string(),
    pricePaid    : z.string()
})