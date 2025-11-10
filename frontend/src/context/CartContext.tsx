import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

type CartItem = {
  _id: string;
  product: any;
  quantity: number;
  selectedAttributes?: Record<string, string>;
};

type Cart = {
  _id: string;
  items: CartItem[];
};

type CartContextValue = {
  cart: Cart | null;
  refresh: () => Promise<void>;
  add: (productId: string, quantity?: number, selectedAttributes?: Record<string, string>) => Promise<void>;
  update: (itemId: string, quantity: number) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);

  async function refresh() {
    const r = await api.get('/cart');
    setCart(r.data);
  }

  useEffect(() => {
    // Try to load cart on mount (will fail if unauthenticated)
    refresh().catch(() => {});
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    cart,
    refresh,
    async add(productId, quantity = 1, selectedAttributes) {
      const r = await api.post('/cart/items', { productId, quantity, selectedAttributes });
      setCart(r.data);
    },
    async update(itemId, quantity) {
      const r = await api.put(`/cart/items/${itemId}`, { quantity });
      setCart(r.data);
    },
    async remove(itemId) {
      const r = await api.delete(`/cart/items/${itemId}`);
      setCart(r.data);
    }
  }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

