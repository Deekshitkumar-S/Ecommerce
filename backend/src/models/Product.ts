import { Schema, model, models } from 'mongoose';

export type ProductDocument = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand?: string;
  attributes?: Record<string, string[]>;
  stock: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true, index: 'text' },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true, index: true },
    brand: { type: String },
    attributes: { type: Schema.Types.Mixed },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1, createdAt: -1 });

export const Product = models.Product || model<ProductDocument>('Product', productSchema);

