import { Resend } from 'resend'
import { GLOBAL } from '../config/global'
import PurchaseReceiptEmail from './purchase-receipt'

// import * as dotenv from 'dotenv'
// dotenv.config()

const resend = new Resend(GLOBAL.RESEND.SENDER_EMAIL)
export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
    await resend.emails.send({
        from: `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
        to: order.user.email,
        subject: `Order Confirmation ${order.id}`,
        react: <PurchaseReceiptEmail order={order} />
    })
}