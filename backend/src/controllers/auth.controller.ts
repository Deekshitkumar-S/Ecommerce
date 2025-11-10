import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { StatusCodes } from 'http-status-codes';

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body as Record<string, string>;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(StatusCodes.CONFLICT).json({ error: 'Email already in use' });
  }
  const user = await User.create({ email, password, firstName, lastName });
  const access = signAccessToken({ userId: user._id.toString(), role: user.role });
  const refresh = signRefreshToken({ userId: user._id.toString(), role: user.role });
  setAuthCookies(res, refresh);
  return res.status(StatusCodes.CREATED).json({
    user: sanitizeUser(user),
    accessToken: access
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as Record<string, string>;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
  }
  const access = signAccessToken({ userId: user._id.toString(), role: user.role });
  const refresh = signRefreshToken({ userId: user._id.toString(), role: user.role });
  setAuthCookies(res, refresh);
  return res.json({
    user: sanitizeUser(user),
    accessToken: access
  });
}

export async function logout(_req: Request, res: Response) {
  clearAuthCookies(res);
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function refreshToken(req: Request, res: Response) {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'No refresh token' });
  }
  try {
    const payload = verifyRefreshToken(token);
    const access = signAccessToken(payload);
    return res.json({ accessToken: access });
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid refresh token' });
  }
}

function sanitizeUser(user: any) {
  return {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  };
}

function setAuthCookies(res: Response, refresh: string) {
  res.cookie('refreshToken', refresh, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/api'
  });
}

function clearAuthCookies(res: Response) {
  res.clearCookie('refreshToken', { path: '/api' });
}

