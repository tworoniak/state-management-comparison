import type { Library } from '../types';

export const storeSource: Record<Library, { filename: string; code: string }> =
  {
    zustand: {
      filename: 'stores/zustand/useCartStore.ts',
      code: `import { create } from 'zustand'
import type { CartState, Product } from '../../types'

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) => set((state) => {
    const existing = state.items.find(i => i.product.id === product.id)
    if (existing) {
      return { items: state.items.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )}
    }
    return { items: [...state.items, { product, quantity: 1 }] }
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter(i => i.product.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: quantity <= 0
      ? state.items.filter(i => i.product.id !== productId)
      : state.items.map(i =>
          i.product.id === productId ? { ...i, quantity } : i
        )
  })),

  clearCart: () => set({ items: [] }),

  get totalItems() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },
  get totalPrice() {
    return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  },
}))`,
    },

    jotai: {
      filename: 'stores/jotai/cartAtoms.ts',
      code: `import { atom } from 'jotai'
import type { CartItem, Product } from '../../types'

export const cartItemsAtom = atom<CartItem[]>([])

export const totalItemsAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.quantity, 0)
)

export const totalPriceAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.product.price * i.quantity, 0)
)

export const addItemAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom)
  const existing = items.find(i => i.product.id === product.id)
  if (existing) {
    set(cartItemsAtom, items.map(i =>
      i.product.id === product.id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    ))
  } else {
    set(cartItemsAtom, [...items, { product, quantity: 1 }])
  }
})

export const removeItemAtom = atom(null, (get, set, productId: string) => {
  set(cartItemsAtom, get(cartItemsAtom).filter(i => i.product.id !== productId))
})

export const updateQuantityAtom = atom(null, (get, set, {
  productId,
  quantity,
}: {
  productId: string
  quantity: number
}) => {
  const items = get(cartItemsAtom)
  set(cartItemsAtom,
    quantity <= 0
      ? items.filter(i => i.product.id !== productId)
      : items.map(i => i.product.id === productId ? { ...i, quantity } : i)
  )
})

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, [])
})`,
    },

    redux: {
      filename: 'stores/redux/cartSlice.ts',
      code: `import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../../types'

interface ReduxCartState { items: CartItem[] }

const initialState: ReduxCartState = { items: [] }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        i => i.product.id === action.payload.id
      )
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        i => i.product.id !== action.payload
      )
    },

    updateQuantity: (state, action: PayloadAction<{
      productId: string
      quantity: number
    }>) => {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.product.id !== productId)
      } else {
        const item = state.items.find(i => i.product.id === productId)
        if (item) item.quantity = quantity
      }
    },

    clearCart: (state) => { state.items = [] },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer`,
    },
  };
