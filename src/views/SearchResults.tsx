import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/catalog/ProductGrid';
import { products } from '@/data/products';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q')?.toLowerCase() ?? '';
  const results = useMemo(() => products.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q))), [q]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Search results for "{q}"</h1>
      <ProductGrid products={results} />
    </div>
  );
}
