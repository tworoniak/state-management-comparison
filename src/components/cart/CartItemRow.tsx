import type { CartItem } from '../../types';

interface Props {
  item: CartItem;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function CartItemRow({ item, onRemove, onUpdateQuantity }: Props) {
  return (
    <div className='flex items-center gap-3 px-4 py-3'>
      <span className='text-2xl'>{item.product.image}</span>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-zinc-800 truncate'>
          {item.product.name}
        </p>
        <p className='text-xs text-zinc-400'>
          ${item.product.price.toFixed(2)} each
        </p>
      </div>
      <div className='flex items-center gap-1.5'>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          className='w-6 h-6 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-sm flex items-center justify-center transition-colors cursor-pointer'
        >
          −
        </button>
        <span className='w-6 text-center text-sm font-mono text-zinc-700'>
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className='w-6 h-6 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-sm flex items-center justify-center transition-colors cursor-pointer'
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.product.id)}
          className='w-6 h-6 rounded-md hover:bg-red-50 text-zinc-300 hover:text-red-400 text-sm flex items-center justify-center transition-colors ml-1 cursor-pointer'
        >
          ×
        </button>
      </div>
    </div>
  );
}
