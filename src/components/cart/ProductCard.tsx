import type { Product } from '../../types';
import { useRenderCount } from '../../hooks/useRenderCount';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  cartQuantity: number;
}

export function ProductCard({ product, onAdd, cartQuantity }: Props) {
  const renders = useRenderCount(`ProductCard:${product.id}`);

  return (
    <div className='relative bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md hover:border-zinc-300 transition-all duration-200'>
      <span className='absolute top-2 right-2 text-xs text-zinc-400 font-mono'>
        renders: {renders}
      </span>
      <div className='text-4xl text-center py-4 bg-zinc-50 rounded-lg'>
        {product.image}
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-xs text-zinc-400 uppercase tracking-wider'>
          {product.category}
        </span>
        <h3 className='font-semibold text-zinc-800 text-sm leading-tight'>
          {product.name}
        </h3>
        <div className='flex items-center justify-between mt-1'>
          <span className='text-zinc-900 font-bold'>
            ${product.price.toFixed(2)}
          </span>
          <span className='text-xs text-amber-500'>
            {'★'.repeat(Math.round(product.rating))} {product.rating}
          </span>
        </div>
      </div>
      <button
        onClick={() => onAdd(product)}
        className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
          ${
            cartQuantity > 0
              ? 'bg-zinc-900 text-white hover:bg-zinc-700'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
      >
        {cartQuantity > 0
          ? `In cart (${cartQuantity}) · Add more`
          : 'Add to cart'}
      </button>
    </div>
  );
}
