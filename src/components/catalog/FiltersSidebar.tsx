import { useCatalogStore } from '@/state/useCatalogStore';

export default function FiltersSidebar() {
  const { categories, setCategory, selectedCategory, inStockOnly, setInStockOnly, minPrice, maxPrice, setPriceRange, minRating, setMinRating, sort, setSort } = useCatalogStore();

  return (
    <aside aria-label="Filters" className="card p-4">
      <h2 className="text-lg font-bold">Filters</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select value={selectedCategory ?? ''} onChange={(e) => setCategory(e.target.value || undefined)} className="input mt-1">
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Price Range</label>
          <div className="mt-2 flex items-center gap-2">
            <input type="number" min={0} value={minPrice} onChange={(e) => setPriceRange(Number(e.target.value), maxPrice)} className="input" aria-label="Min price" />
            <span className="text-sm">to</span>
            <input type="number" min={0} value={maxPrice} onChange={(e) => setPriceRange(minPrice, Number(e.target.value))} className="input" aria-label="Max price" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Min Rating</label>
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="input mt-1">
            {[0,1,2,3,4].map(r => <option key={r} value={r}>{r}+</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input id="instock" type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          <label htmlFor="instock" className="text-sm">In Stock Only</label>
        </div>
        <div>
          <label className="block text-sm font-medium">Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="input mt-1">
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
