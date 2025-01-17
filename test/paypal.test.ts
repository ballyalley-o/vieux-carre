import { generateAccessToken } from 'lib/paypal'

/**
 * tests to generate token
 */
test('generates access from paypal', async () => {
    const tokenResponse = await generateAccessToken()
    console.log(tokenResponse)
    expect(typeof tokenResponse).toBe('string')
    expect(tokenResponse.length).toBeGreaterThan(0)
})