import { Router } from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';

const schema = {
  register: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string().min(1),
      lastName: z.string().min(1)
    })
  }),
  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8)
    })
  })
};

export const authRouter = Router();

authRouter.post('/register', validate(schema.register), register);
authRouter.post('/login', validate(schema.login), login);
authRouter.post('/logout', logout);
authRouter.post('/refresh', refreshToken);


