import { Schema, model, models, Types } from 'mongoose';

export type CartItem = {
  _id: string;
  product: Types.ObjectId;
  quantity: number;
  selectedAttributes?: Record<string, string>;
};

export type CartDocument = {
  _id: string;
  user: Types.ObjectId;
  items: CartItem[];
  updatedAt: Date;
  createdAt: Date;
};

const cartItemSchema = new Schema<CartItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    selectedAttributes: { type: Schema.Types.Mixed }
  },
  { _id: true }
);

const cartSchema = new Schema<CartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] }
  },
  { timestamps: true }
);

export const Cart = models.Cart || model<CartDocument>('Cart', cartSchema);

