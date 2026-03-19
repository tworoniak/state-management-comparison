import { useCartStore } from '../../stores/zustand/useCartStore';
import { ProductGrid } from '../cart/ProductGrid';
import { CartSidebar } from '../cart/CartSidebar';
import { products } from '../../data/products';

export function ZustandCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();
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
