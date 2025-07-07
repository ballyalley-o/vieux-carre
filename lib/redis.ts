import { GLOBAL } from 'vieux-carre'
import { Redis } from '@upstash/redis'

const { REST_URL, REST_TOKEN } = GLOBAL.REDIS.UPSTASH

const redis = new Redis({
  url  : REST_URL,
  token: REST_TOKEN
})

export default redis
