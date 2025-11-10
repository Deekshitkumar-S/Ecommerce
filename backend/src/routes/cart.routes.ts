import { Router } from 'express';
import { addToCart, getCart, removeCartItem, updateCartItem } from '../controllers/cart.controller.js';
import { requireAuth } from '../middleware/auth.js';

export const cartRouter = Router();

cartRouter.use(requireAuth);
cartRouter.get('/', getCart);
cartRouter.post('/items', addToCart);
cartRouter.put('/items/:itemId', updateCartItem);
cartRouter.delete('/items/:itemId', removeCartItem);


