import { GLOBAL } from 'config/global'
import { join } from 'path'

const base = GLOBAL.PAYPAL.PAYPAL_API_URL
export const paypal = {}

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = GLOBAL.PAYPAL
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString('base64')

  const url = join(base, 'v1', 'oauth2', 'token')
  console.log('URL: ', url)
  const response = await fetch(url, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
  })

  if (response.ok) {
    const jsonData = await response.json()
    return jsonData.access_token
  } else {
    const errorMessage = await response.text()
    throw new Error(errorMessage)
  }
}

export { generateAccessToken }