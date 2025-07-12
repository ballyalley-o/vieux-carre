import { Resend } from 'resend'
import { GLOBAL } from '../config/global'
import { transl } from '../lib/util'
import ResetPasswordEmail from './send-password-reset'
import PurchaseReceiptEmail from './purchase-receipt'

const resend = new Resend(GLOBAL.RESEND.RESEND_API_KEY as string)

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  try {
      await resend.emails.send({
        from   : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
        to     : order.user.email,
        subject: `Order Confirmation ${order.id}`,
        react  : <PurchaseReceiptEmail order={order} />
    })
  } catch (error) {
    console.error(transl('error.send_email'), error)
  }
}

export const sendResetPasswordLink = async ({ resetLink, userEmail }: { resetLink: string; userEmail: string }) => {
  const year = new Date().getFullYear()
  try {
    await resend.emails.send({
      from   : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
      to     : userEmail,
      subject: transl('smtp.reset_password.subject'),
      react  : <ResetPasswordEmail year={year} resetLink={resetLink} siteName={GLOBAL.APP_NAME} />
    })
  } catch (error) {
    console.error(transl('error.send_email'), error)
  }
}