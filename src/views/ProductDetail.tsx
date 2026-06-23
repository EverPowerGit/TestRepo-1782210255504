import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import { products } from '@/data/products';
import ProductGrid from '@/components/catalog/ProductGrid';
import { useCartStore } from '@/state/useCartStore';

export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => products.find((p) => p.id === String(id)), [id]);
  const add = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!product) return;
    // minimal SEO tags
    document.title = `${product.title} — Retail Market`;
    const ld = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      image: product.images,
      description: product.description,
      brand: 'Retail Market',
      offers: { '@type': 'Offer', priceCurrency: 'USD', price: product.price, availability: product.stock>0? 'https://schema.org/InStock':'https://schema.org/OutOfStock' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: Math.floor(50 + product.rating*10) }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [product]);

  if (!product) return <p className="p-4">Product not found.</p>;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Catalog', to: '/products' }, { label: product.title }]} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-4">
          <div className="grid grid-cols-5 gap-3">
            <img src={product.images[0]} alt="Main image" className="col-span-5 h-72 w-full rounded-xl object-cover md:col-span-5" />
            {/* Additional images gallery (thumbnails) */}
            {product.images.slice(1,5).map((src, i) => (
              <img key={src} src={src} alt={`Additional ${i+1}`} className="col-span-1 h-24 w-full rounded-xl object-cover" />
            ))}
          </div>
        </div>
        <div className="card space-y-4 p-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
          <p className="text-3xl font-extrabold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{product.description}</p>
          <ul className="list-inside list-disc text-sm text-gray-600 dark:text-gray-300">
            <li>Rating: {product.rating} / 5</li>
            <li>Stock: {product.stock > 0 ? 'In stock' : 'Out of stock'}</li>
            <li>Tags: {product.tags?.join(', ')}</li>
          </ul>
          <div className="flex items-center gap-3">
            <button onClick={() => add(product, 1)} className="btn-primary">Add to cart</button>
            <span className="text-sm text-gray-500">Free returns within 30 days.</span>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Related Products</h2>
        <div className="mt-4">
          <ProductGrid products={related} />
        </div>
      </section>
    </div>
  );
}
