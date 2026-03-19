import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { useRenderCount } from '../../hooks/useRenderCount';

interface Props {
  onAdd: (product: Product) => void;
  getQuantity: (productId: string) => number;
  products: Product[];
}

export function ProductGrid({ onAdd, getQuantity, products }: Props) {
  const renders = useRenderCount('ProductGrid');

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-semibold text-zinc-500 uppercase tracking-wider'>
          Products
        </h2>
        <span className='text-xs text-zinc-400 font-mono'>
          grid renders: {renders}
        </span>
      </div>
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-3'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
            cartQuantity={getQuantity(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
