import { useAtomValue, useSetAtom } from 'jotai';
import {
  cartItemsAtom,
  addItemAtom,
  removeItemAtom,
  updateQuantityAtom,
  clearCartAtom,
} from '../../stores/jotai/cartAtoms';
import { ProductGrid } from '../cart/ProductGrid';
import { CartSidebar } from '../cart/CartSidebar';
import { products } from '../../data/products';

export function JotaiCart() {
  const items = useAtomValue(cartItemsAtom);
  const addItem = useSetAtom(addItemAtom);
  const removeItem = useSetAtom(removeItemAtom);
  const updateQuantityAction = useSetAtom(updateQuantityAtom);
  const clearCart = useSetAtom(clearCartAtom);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const getQuantity = (id: string) =>
    items.find((i) => i.product.id === id)?.quantity ?? 0;
  const updateQuantity = (productId: string, quantity: number) =>
    updateQuantityAction({ productId, quantity });

  return (
    <div className='flex gap-6 h-full'>
      <div className='flex-1 overflow-y-auto'>
        <ProductGrid
          products={products}
          onAdd={addItem}
          getQuantity={getQuantity}
        />
      </div>
      <div className='w-72 shrink-0'>
        <CartSidebar
          items={items}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onRemove={removeItem}
          onUpdateQuantity={updateQuantity}
          onClear={clearCart}
        />
      </div>
    </div>
  );
}
