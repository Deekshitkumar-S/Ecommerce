import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import { env, assertEnv } from './config/env.js';
import { connectDb, disconnectDb } from './config/db.js';
import { logger } from './config/logger.js';

import { authRouter } from './routes/auth.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import { ordersRouter } from './routes/orders.routes.js';
import { errorHandler } from './middleware/error.js';

assertEnv();

const app = express();

app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
);
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: env.rateLimitWindow * 60 * 1000,
    max: env.rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

const base = `/api/${env.apiVersion}`;
app.use(`${base}/auth`, authRouter);
app.use(`${base}/products`, productsRouter);
app.use(`${base}/cart`, cartRouter);
app.use(`${base}/orders`, ordersRouter);

app.use(errorHandler);

const server = app.listen(env.port, async () => {
  await connectDb();
  logger.info(`API listening on http://localhost:${env.port}${base}`);
});

async function shutdown(signal: string) {
  logger.info(`Received ${signal}, shutting down...`);
  server.close(async () => {
    await disconnectDb();
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

