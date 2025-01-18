import { GLOBAL } from 'config/global'
import { join } from 'path'

const base = GLOBAL.PAYPAL.PAYPAL_API_URL
export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken()
    const url         = join(base, 'v2', 'checkout', 'orders')
    const body        = { intent: 'CAPTURE', purchase_units: [{ amount: { currency_code: GLOBAL.PRICES.CURRENCY, value: price } }] }
    const options     = {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body   : JSON.stringify(body)
    }
    const response = await fetch(url, options)

    return handleResponse(response)
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken()
    const url         = join(base, 'v2', 'checkout', 'orders', orderId, 'capture')
    const options     = {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
    }
    const response = await fetch(url, options)

    return handleResponse(response)
  }
}

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = GLOBAL.PAYPAL
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString('base64')
  const url = join(base, 'v1', 'oauth2', 'token')

  const response = await fetch(url, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
  })

  const jsonData = await handleResponse(response)
  return jsonData.access_token
}

async function handleResponse(response: Response) {
  if (response.ok) {
    return response.json()
  } else {
    const errorMessage = await response.text()
    throw new Error(errorMessage)
  }
}

export { generateAccessToken }
