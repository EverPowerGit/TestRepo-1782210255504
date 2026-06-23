import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/state/useCartStore';
import { useUserStore } from '@/state/useUserStore';
import RatingStars from './RatingStars';
import PriceTag from './PriceTag';

export default function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.addItem);
  const toggleWish = useUserStore((s) => s.toggleWishlist);
  const wished = useUserStore((s) => s.wishlist.includes(product.id));

  return (
    <article className="card group flex flex-col overflow-hidden p-4" aria-labelledby={`p-${product.id}-title`}>
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden rounded-xl">
        <img src={product.images[0]} alt={`${product.title} image`} className="h-48 w-full object-cover transition-transform group-hover:scale-105" />
        {product.tags?.slice(0,2).map(t => (
          <span key={t} className="pill absolute left-2 top-2 bg-brand-600/90 text-white">{t}</span>
        ))}
      </Link>
      <div className="mt-3 flex-1">
        <h3 id={`p-${product.id}-title`} className="line-clamp-2 text-sm font-semibold">{product.title}</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <RatingStars rating={product.rating} />
          <PriceTag price={product.price} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={() => add(product, 1)} className="btn-primary flex-1" aria-label={`Add ${product.title} to cart`}>
          <ShoppingCart className="h-4 w-4" /> Add
        </button>
        <button aria-label="Toggle wishlist" onClick={() => toggleWish(product.id)} className={`rounded-xl border px-3 py-2 transition-colors ${wished ? 'border-brand-600 text-brand-600' : 'border-gray-200 text-gray-600 dark:border-white/10'}`}>
          <Heart className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
