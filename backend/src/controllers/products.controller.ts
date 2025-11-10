import { Request, Response } from 'express';
import { Product } from '../models/Product.js';

export async function listProducts(req: Request, res: Response) {
  const { page = '1', limit = '20', category, sort = '-createdAt', search } = req.query as Record<string, string>;
  const p = Math.max(parseInt(page, 10) || 1, 1);
  const l = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const filter: any = {};
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const query = Product.find(filter)
    .sort(sort)
    .skip((p - 1) * l)
    .limit(l);
  const [items, total] = await Promise.all([
    query.exec(),
    Product.countDocuments(filter)
  ]);
  res.json({
    items,
    page: p,
    limit: l,
    total,
    totalPages: Math.ceil(total / l)
  });
}

export async function getProduct(req: Request, res: Response) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
}

