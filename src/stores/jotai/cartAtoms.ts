import { atom } from 'jotai';
import type { CartItem, Product } from '../../types';

export const cartItemsAtom = atom<CartItem[]>([]);

export const totalItemsAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.quantity, 0),
);

export const totalPriceAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.product.price * i.quantity, 0),
);

export const addItemAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom);
  const existing = items.find((i) => i.product.id === product.id);
  if (existing) {
    set(
      cartItemsAtom,
      items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  } else {
    set(cartItemsAtom, [...items, { product, quantity: 1 }]);
  }
});

export const removeItemAtom = atom(null, (get, set, productId: string) => {
  set(
    cartItemsAtom,
    get(cartItemsAtom).filter((i) => i.product.id !== productId),
  );
});

export const updateQuantityAtom = atom(
  null,
  (
    get,
    set,
    { productId, quantity }: { productId: string; quantity: number },
  ) => {
    const items = get(cartItemsAtom);
    set(
      cartItemsAtom,
      quantity <= 0
        ? items.filter((i) => i.product.id !== productId)
        : items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
    );
  },
);

export const clearCartAtom = atom(null, (_get, set) => set(cartItemsAtom, []));
