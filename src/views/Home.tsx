import { Link } from 'react-router-dom';
import ProductGrid from '@/components/catalog/ProductGrid';
import { products } from '@/data/products';

export default function Home() {
  const featured = products.slice(0, 8);
  const categories = ['Electronics', 'Apparel', 'Home', 'Groceries'];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-fuchsia-600 p-10 text-white shadow-glow">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Discover your next favorite thing</h1>
        <p className="mt-3 max-w-2xl text-white/90">Shop curated collections across electronics, apparel, home, and groceries. Fast checkout, great deals.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/products" className="rounded-xl bg-white px-5 py-2.5 font-semibold text-brand-700 shadow-lg shadow-white/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">Shop Now</Link>
          <Link to="/products?sort=popularity" className="rounded-xl border border-white/50 px-5 py-2.5 font-semibold text-white">Popular Deals</Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Featured Categories</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="card flex items-center justify-center rounded-2xl p-8 text-lg font-bold">{c}</Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="mt-4">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="card grid gap-6 p-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold">Weekend Flash Sale</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Up to 40% off select items. Limited time only.</p>
          <Link to="/products" className="btn-primary mt-4 inline-flex">Explore Deals</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop" alt="Promotional banner" className="h-48 w-full rounded-xl object-cover" />
      </section>
    </div>
  );
}
