import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  apiVersion: process.env.API_VERSION ?? 'v1',

  mongodbUri: process.env.MONGODB_URI ?? '',
  dbName: process.env.DB_NAME ?? 'ecommerce',

  redisUrl: process.env.REDIS_URL ?? '',
  redisPassword: process.env.REDIS_PASSWORD ?? '',

  jwtSecret: process.env.JWT_SECRET ?? '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
  jwtExpire: process.env.JWT_EXPIRE ?? '15m',
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE ?? '7d',

  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 12),

  rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW ?? 15),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),

  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL ?? 'info'
} as const;

export function assertEnv() {
  const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET'
  ] as const;
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

