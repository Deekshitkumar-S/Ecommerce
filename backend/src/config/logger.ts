import { createLogger, format, transports } from 'winston';
import { env } from './env.js';

export const logger = createLogger({
  level: env.logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ level, message, timestamp, stack, ...meta }) => {
          const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return `${timestamp} ${level}: ${stack ?? message}${metaStr}`;
        })
      )
    })
  ]
});

