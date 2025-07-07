import redis from 'lib/redis'
import { transl } from 'lib/util'

type CacheOptions<T> = {
  key     : string
  ttl    ?: number
  fetcher : () => Promise<T>
}

/**
 * Caches data using a specified key and fetcher function, with an optional time-to-live (TTL) in seconds.
 * If the data is already cached, it attempts to retrieve and parse it from the cache.
 * If the cached data is unavailable or parsing fails, it fetches new data using the provided fetcher function,
 * stores it in the cache, and returns the fetched data.
 *
 * @template T - The type of the data being cached.
 * @param {CacheOptions<T>} options - The options for caching.
 * @param {string} options.key - The unique key used to store and retrieve the cached data.
 * @param {number} [options.ttl=300] - The time-to-live for the cached data in seconds. Defaults to 300 seconds.
 * @param {() => Promise<T>} options.fetcher - A function that fetches the data to be cached if it's not already cached.
 * @returns {Promise<T>} - The cached or newly fetched data.
 * @throws {Error} - Throws an error if the fetcher function fails to retrieve the data.
 */
export async function cache<T = unknown>({ key, ttl = 300, fetcher }: CacheOptions<T>): Promise<T> {
  if (!key) {
    throw new Error(transl('error.invalid_cache_key', { key }))
  }
  const cachedRaw = await redis.get(key)
  if (cachedRaw && typeof cachedRaw === 'string' && cachedRaw.trim() !== '') {
    try {
        return JSON.parse(typeof cachedRaw === 'string' ? cachedRaw : '') as T
    } catch (error) {
        console.warn(transl('error.failed_parse_cache_key', { key }), error)
    }
  }

  const data = await fetcher()
  await redis.set(key, JSON.stringify(data), { ex: ttl })
  return data
}

export async function invalidateCache(key: string) {
  await redis.del(key)
}
