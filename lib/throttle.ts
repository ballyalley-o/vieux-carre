import { GLOBAL } from 'vieux-carre'
import redis from 'lib/redis'

const MAX_ATTEMPTS   = GLOBAL.LIMIT.SIGNIN_ATTEMPT_MAX
const WINDOW_SECONDS = GLOBAL.LIMIT.SIGNIN_TTL

/**
 * Checks if a user (by key) has exceeded login attempts.
 * @param key A unique throttle key (usually email or email+IP).
 * @returns An object indicating if blocked and wait time in seconds.
 */
export async function checkSignInThrottle(key: string) {
  const [attemptsStr, ttl] = await Promise.all([redis.get(key), redis.ttl(key)])
  const attempts           = parseInt(attemptsStr as string || '0', 10)
  const isBlocked          = attempts >= MAX_ATTEMPTS
  const secondsLeft        = isBlocked ? (ttl > 0 ? ttl : WINDOW_SECONDS) : 0

  return { isBlocked, secondsLeft }
}

/**
 * Increments failed login count and sets TTL.
 * @param key A unique throttle key (usually email or email+IP).
 */
export async function incrementSignInAttempts(key: string) {
  await redis.multi().incr(key).expire(key, WINDOW_SECONDS).exec()
}

/**
 * Resets login attempt count.
 * @param key A unique throttle key (usually email or email+IP).
 */
export async function resetSignInAttempts(key: string) {
  await redis.del(key)
}
