import { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

function getUserId(req: Request) {
  return (req as any).user?.userId as string;
}

export async function createOrder(req: Request, res: Response) {
  const userId = getUserId(req);
  const { shippingAddress, paymentMethod } = req.body as any;
  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  const productIds = cart.items.map((i) => i.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const items = cart.items.map((i) => {
    const p = products.find((pp) => pp._id.toString() === i.product.toString())!;
    return {
      product: p._id,
      title: p.title,
      price: p.price,
      quantity: i.quantity,
      selectedAttributes: i.selectedAttributes
    };
  });
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    paymentMethod,
    status: 'pending',
    total
  });
  cart.items = [];
  await cart.save();
  res.status(201).json(order);
}

export async function listOrders(req: Request, res: Response) {
  const userId = getUserId(req);
  const orders = await Order.find({ user: userId }).sort('-createdAt');
  res.json(orders);
}

export async function getOrder(req: Request, res: Response) {
  const userId = getUserId(req);
  const order = await Order.findOne({ _id: req.params.id, user: userId });
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
}

