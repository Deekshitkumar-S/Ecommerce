import { Schema, model, models, Types } from 'mongoose';

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type OrderItem = {
  product: Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
  selectedAttributes?: Record<string, string>;
};

export type OrderDocument = {
  _id: string;
  user: Types.ObjectId;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'credit_card' | 'cod' | 'wallet';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: Date;
  updatedAt: Date;
};

const addressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  { _id: false }
);

const orderItemSchema = new Schema<OrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    selectedAttributes: { type: Schema.Types.Mixed }
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [orderItemSchema], required: true },
    shippingAddress: { type: addressSchema, required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'cod', 'wallet'], required: true },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending', index: true },
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });

export const Order = models.Order || model<OrderDocument>('Order', orderSchema);

