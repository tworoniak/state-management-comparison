import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';

interface ReduxCartState {
  items: CartItem[];
}

const initialState: ReduxCartState = { items: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.product.id !== productId);
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
