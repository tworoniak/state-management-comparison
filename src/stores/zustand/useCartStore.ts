import { create } from 'zustand';
import type { CartState, Product } from '../../types';
import { actionLog } from '../../lib/actionLog';

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product: Product) => {
    actionLog.dispatch({
      library: 'zustand',
      action: 'addItem',
      payload: product.name,
    });
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
    });
  },

  removeItem: (productId) => {
    actionLog.dispatch({
      library: 'zustand',
      action: 'removeItem',
      payload: productId,
    });
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    actionLog.dispatch({
      library: 'zustand',
      action: 'updateQuantity',
      payload: { productId, quantity },
    });
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.product.id !== productId)
          : state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i,
            ),
    }));
  },

  clearCart: () => {
    actionLog.dispatch({ library: 'zustand', action: 'clearCart' });
    set({ items: [] });
  },
}));
