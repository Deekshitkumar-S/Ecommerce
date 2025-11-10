import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

export async function connectDb() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongodbUri, {
    dbName: env.dbName
  });
  logger.info('Connected to MongoDB', { dbName: env.dbName });
}

export async function disconnectDb() {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
}

