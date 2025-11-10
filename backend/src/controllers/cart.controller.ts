import { Request, Response } from 'express';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

function getUserId(req: Request) {
  return (req as any).user?.userId as string;
}

export async function getCart(req: Request, res: Response) {
  const userId = getUserId(req);
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  res.json(cart);
}

export async function addToCart(req: Request, res: Response) {
  const userId = getUserId(req);
  const { productId, quantity, selectedAttributes } = req.body as any;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  const existing = cart.items.find((i) => i.product.toString() === productId && JSON.stringify(i.selectedAttributes ?? {}) === JSON.stringify(selectedAttributes ?? {}));
  if (existing) {
    existing.quantity += quantity ?? 1;
  } else {
    cart.items.push({ product: product._id, quantity: quantity ?? 1, selectedAttributes });
  }
  await cart.save();
  const populated = await cart.populate('items.product');
  res.status(201).json(populated);
}

export async function updateCartItem(req: Request, res: Response) {
  const userId = getUserId(req);
  const { itemId } = req.params;
  const { quantity } = req.body as any;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  item.quantity = quantity ?? item.quantity;
  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
}

export async function removeCartItem(req: Request, res: Response) {
  const userId = getUserId(req);
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  item.deleteOne();
  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
}

