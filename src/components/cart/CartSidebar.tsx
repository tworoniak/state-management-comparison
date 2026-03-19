import type { CartItem as CartItemType } from '../../types';
import { CartItemRow } from './CartItemRow';
import { useRenderCount } from '../../hooks/useRenderCount';

interface Props {
  items: CartItemType[];
  totalItems: number;
  totalPrice: number;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClear: () => void;
}

export function CartSidebar({
  items,
  totalItems,
  totalPrice,
  onRemove,
  onUpdateQuantity,
  onClear,
}: Props) {
  const renders = useRenderCount('CartSidebar');

  return (
    <div className='flex flex-col h-full bg-white border border-zinc-200 rounded-xl overflow-hidden'>
      <div className='flex items-center justify-between px-4 py-3 border-b border-zinc-100'>
        <div className='flex items-center gap-2'>
          <h2 className='font-semibold text-zinc-800 text-sm'>Cart</h2>
          {totalItems > 0 && (
            <span className='bg-zinc-900 text-white text-xs rounded-full px-2 py-0.5 font-mono'>
              {totalItems}
            </span>
          )}
        </div>
        <span className='text-xs text-zinc-400 font-mono'>
          renders: {renders}
        </span>
      </div>

      {items.length === 0 ? (
        <div className='flex-1 flex items-center justify-center text-zinc-400 text-sm'>
          Your cart is empty
        </div>
      ) : (
        <>
          <div className='flex-1 overflow-y-auto divide-y divide-zinc-100'>
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          <div className='border-t border-zinc-200 p-4 flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-zinc-500'>Total</span>
              <span className='font-bold text-zinc-900'>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onClear}
              className='w-full py-2 text-sm text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer'
            >
              Clear cart
            </button>
            <button className='w-full py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-all duration-200 cursor-pointer'>
              Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
