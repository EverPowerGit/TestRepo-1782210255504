import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  subtotal: number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.product.id === product.id);
        if (idx >= 0) items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        else items.push({ product, quantity });
        set({ items });
      },
      updateQuantity: (productId, quantity) => {
        const items = get().items.map((i) => (i.product.id === productId ? { ...i, quantity } : i));
        set({ items });
      },
      removeItem: (productId) => set({ items: get().items.filter((i) => i.product.id !== productId) }),
      clear: () => set({ items: [] }),
      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },
    }),
    { name: 'retail-cart' }
  )
);
