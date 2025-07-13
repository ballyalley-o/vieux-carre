import { Resend } from 'resend'
import { GLOBAL } from '../config/global'
import { transl } from '../lib/util'
import ResetPasswordEmail from './send-password-reset'
import PurchaseReceiptEmail from './purchase-receipt'

const resend = new Resend(GLOBAL.RESEND.RESEND_API_KEY as string)

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  console.log('sending email receipt: ')

  try {
      const res = await resend.emails.send({
        from   : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
        to     : order.user.email,
        subject: transl('smtp.purchase_receipt.subject', { orderId: order.id}),
        react  : <PurchaseReceiptEmail order={order} />
    })
    console.log('email res: ', res)
  } catch (error) {
    console.error(transl('error.send_email'), error)
  }
}

export const sendResetPasswordLink = async ({ resetLink, userEmail }: { resetLink: string; userEmail: string }) => {
  console.log('attempting to email password reset link')
  const year = new Date().getFullYear()
  try {
    const res = await resend.emails.send({
      from   : `${GLOBAL.APP_NAME} <${GLOBAL.RESEND.SENDER_EMAIL}>`,
      to     : userEmail,
      subject: transl('smtp.reset_password.subject'),
      react  : <ResetPasswordEmail year={year} resetLink={resetLink} siteName={GLOBAL.APP_NAME} />
    })
  console.log('should be sent!')
  console.log('email res: ', res)
  } catch (error) {
    console.error(transl('error.send_email'), error)
  }
}