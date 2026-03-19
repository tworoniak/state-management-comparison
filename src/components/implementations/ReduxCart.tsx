import { useAppDispatch, useAppSelector } from '../../stores/redux/hooks';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from '../../stores/redux/cartSlice';
import { ProductGrid } from '../cart/ProductGrid';
import { CartSidebar } from '../cart/CartSidebar';
import { products } from '../../data/products';
import type { Product } from '../../types';

export function ReduxCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
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
          onAdd={(product: Product) => dispatch(addItem(product))}
          getQuantity={getQuantity}
        />
      </div>
      <div className='w-72 shrink-0'>
        <CartSidebar
          items={items}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onRemove={(id) => dispatch(removeItem(id))}
          onUpdateQuantity={(productId, quantity) =>
            dispatch(updateQuantity({ productId, quantity }))
          }
          onClear={() => dispatch(clearCart())}
        />
      </div>
    </div>
  );
}
