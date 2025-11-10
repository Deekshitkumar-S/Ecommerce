import { connectDb, disconnectDb } from '../config/db.js';
import { Product } from '../models/Product.js';
import { logger } from '../config/logger.js';

async function main() {
  await connectDb();
  await Product.deleteMany({});
  await Product.insertMany([
    {
      title: 'Pro Laptop 14"',
      description: 'High performance laptop for professionals.',
      price: 1999,
      images: [],
      category: 'electronics',
      brand: 'TechBrand',
      attributes: { color: ['Silver', 'Space Gray'], storage: ['512GB', '1TB'] },
      stock: 25,
      rating: 4.7
    },
    {
      title: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones.',
      price: 299,
      images: [],
      category: 'electronics',
      brand: 'SoundMax',
      attributes: { color: ['Black', 'White'] },
      stock: 100,
      rating: 4.5
    }
  ]);
  logger.info('Seed completed');
  await disconnectDb();
}

main().catch(async (e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  await disconnectDb();
  process.exit(1);
});

