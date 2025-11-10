import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { JwtPayload } from '../types/index.js';

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpire });
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpire });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
}

