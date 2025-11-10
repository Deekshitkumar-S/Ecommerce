import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { StatusCodes } from 'http-status-codes';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
}

export function requireRole(role: 'admin') {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as { role?: string } | undefined;
    if (!user || user.role !== role) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden' });
    }
    next();
  };
}

