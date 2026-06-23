import { useMemo, useState } from 'react';
import FiltersSidebar from '@/components/catalog/FiltersSidebar';
import ProductGrid from '@/components/catalog/ProductGrid';
import Pagination from '@/components/catalog/Pagination';
import { products as dataset } from '@/data/products';
import { useCatalogStore } from '@/state/useCatalogStore';

export default function Catalog() {
  const { selectedCategory, inStockOnly, minPrice, maxPrice, minRating, sort } = useCatalogStore();
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let list = dataset.slice();
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [selectedCategory, inStockOnly, minPrice, maxPrice, minRating, sort]);

  const perPage = 12;
  const total = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <FiltersSidebar />
      </div>
      <div className="lg:col-span-9">
        <div className="card flex items-center justify-between p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">{filtered.length} results</p>
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setView('grid')} className={`rounded-lg px-3 py-1 ${view==='grid' ? 'bg-brand-600 text-white' : 'bg-white/70 dark:bg-white/10'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`rounded-lg px-3 py-1 ${view==='list' ? 'bg-brand-600 text-white' : 'bg-white/70 dark:bg-white/10'}`}>List</button>
          </div>
        </div>
        <div className="mt-4">
          {view === 'grid' ? (
            <ProductGrid products={paged} />
          ) : (
            <div className="space-y-4">
              {paged.map((p) => (
                <div key={p.id} className="card grid grid-cols-1 gap-4 p-4 sm:grid-cols-12">
                  <img src={p.images[0]} alt="" className="sm:col-span-3 h-40 w-full rounded-xl object-cover" />
                  <div className="sm:col-span-9">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                    <div className="mt-2 text-sm text-gray-500">${p.price.toFixed(2)} • {p.rating} ★ • {p.stock>0?'In stock':'Out of stock'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Pagination page={page} total={total} onChange={setPage} />
      </div>
    </div>
  );
}
