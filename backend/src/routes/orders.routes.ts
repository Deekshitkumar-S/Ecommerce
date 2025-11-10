import { Router } from 'express';
import { createOrder, getOrder, listOrders } from '../controllers/orders.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { z } from 'zod';

const createOrderSchema = z.object({
  body: z.object({
    shippingAddress: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.string().min(1),
      country: z.string().min(1)
    }),
    paymentMethod: z.enum(['credit_card', 'cod', 'wallet'])
  })
});

export const ordersRouter = Router();

ordersRouter.use(requireAuth);
ordersRouter.post('/', validate(createOrderSchema), createOrder);
ordersRouter.get('/', listOrders);
ordersRouter.get('/:id', getOrder);


