import { useCartStore } from '../../stores/zustand/useCartStore';
import { ProductGrid } from '../cart/ProductGrid';
import { CartSidebar } from '../cart/CartSidebar';
import { products } from '../../data/products';

export function ZustandCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const getQuantity = (id: string) =>
    items.find((i) => i.product.id === id)?.quantity ?? 0;

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
