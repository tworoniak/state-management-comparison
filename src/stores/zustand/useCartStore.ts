import { create } from 'zustand';
import type { CartState, Product } from '../../types';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.product.id !== productId)
          : state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i,
            ),
    })),

  clearCart: () => set({ items: [] }),

  get totalItems() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },
  get totalPrice() {
    return get().items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    );
  },
}));
