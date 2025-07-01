import { NextRequest, NextResponse } from "next/server"
import { GLOBAL } from "vieux-carre"
import Stripe from "stripe"
import { updateOrderToPaid } from "lib/action/order.action"
import { transl } from "lib/util"

export async function POST(req: NextRequest) {
    const event = await Stripe.webhooks.constructEvent(await req.text(), req.headers.get('stripe-signature') as string, GLOBAL.STRIPE.STRIPE_WEBHOOK_SECRET as string)
    if (event.type === 'charge.succeeded') {
        const { object } = event.data
        await updateOrderToPaid({ orderId: object.metadata.orderId, paymentResult: { id: object.id, status: 'COMPLETED', email_address: object.billing_details.email!, pricePaid: (object.amount / 100).toFixed() }})
        return NextResponse.json({
            message: transl('success.update_order_paid')
        })
    }
    return NextResponse.json({ message: transl('error.update_order_paid') })
}