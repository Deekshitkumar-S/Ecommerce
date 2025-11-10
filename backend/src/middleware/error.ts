import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';
import { ZodError } from 'zod';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'ValidationError',
      details: err.flatten()
    });
  }

  const status = (err as any)?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = (err as any)?.message ?? getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  logger.error('Request failed', { path: req.path, method: req.method, status, message, err });
  res.status(status).json({ error: message });
}

