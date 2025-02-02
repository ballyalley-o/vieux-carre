import { NextRequest, NextResponse } from "next/server"
import { GLOBAL } from "vieux-carre"
import { en } from "public/locale"
import Stripe from "stripe"
import { updateOrderToPaid } from "lib"

export async function POST(req: NextRequest) {
    const event = await Stripe.webhooks.constructEvent(await req.text(), req.headers.get('stripe-signature') as string, GLOBAL.STRIPE.STRIPE_WEBHOOK_SECRET as string)
    if (event.type === 'charge.succeeded') {
        const { object } = event.data
        await updateOrderToPaid({ orderId: object.metadata.orderId, paymentResult: { id: object.id, status: 'COMPLETED', email_address: object.billing_details.email!, pricePaid: (object.amount / 100).toFixed() }})
        return NextResponse.json({
            message: en.success.update_order_paid
        })
    }
    return NextResponse.json({ message: en.error.update_order_paid })
}