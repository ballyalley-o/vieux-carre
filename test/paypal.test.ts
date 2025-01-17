import { generateAccessToken, paypal } from 'lib/paypal'

/**
 * generate token
 */
test('generates access from paypal', async () => {
    const tokenResponse = await generateAccessToken()
    console.log(tokenResponse)
    expect(typeof tokenResponse).toBe('string')
    expect(tokenResponse.length).toBeGreaterThan(0)
})

/**
 * create order
 */
test('creates a paypal order', async () => {
    await generateAccessToken()
    const PRICE         = 124.23
    const orderResponse = await paypal.createOrder(PRICE)
    console.log(orderResponse)
    expect(orderResponse).toHaveProperty('id')
    expect(orderResponse).toHaveProperty('status')
    expect(orderResponse.status).toBe('CREATED')
})

/**
 * capture payment  with mock order
 */
test('simulate capturing a payment from an order', async () => {
    const orderId = '123das'
    const _mockCapturePayment  = jest.spyOn(paypal, 'capturePayment').mockResolvedValue({status: 'COMPLETED'})
    const captureResponse = await paypal.capturePayment(orderId)
    expect(captureResponse).toHaveProperty('status', 'COMPLETED')
    _mockCapturePayment.mockRestore()
})