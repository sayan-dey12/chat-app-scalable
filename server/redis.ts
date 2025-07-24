// server/redis.ts
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // adjust path if needed

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error('REDIS_URL is not defined in .env');
}

export const pub = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {} // Required for Upstash TLS connections
});

export const sub = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {}
});
