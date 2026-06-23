import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Search, ShoppingCart, Heart, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/state/useCartStore';
import { useUserStore } from '@/state/useUserStore';
import { products } from '@/data/products';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const navigate = useNavigate();
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const [q, setQ] = useState('');
  const suggestions = useMemo(() => {
    if (!q.trim()) return [] as { id: string; title: string }[];
    const t = q.trim().toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(t)).slice(0, 5).map(p => ({ id: p.id, title: p.title }));
  }, [q]);
  const { profile } = useUserStore();

  const goSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setQ('');
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const categories = ['Electronics', 'Apparel', 'Home', 'Groceries'];

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <img src="/logo.svg" alt="Retail Market logo" className="h-8 w-8" />
          <span className="bg-gradient-to-r from-brand-600 to-fuchsia-600 bg-clip-text text-transparent">Retail Market</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          <Link to="/" className="text-sm font-medium hover:text-brand-600">Home</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-brand-600" aria-haspopup="true" aria-expanded="false">
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-xl opacity-0 transition-all group-hover:visible group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900">
              {categories.map(c => (
                <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5">{c}</Link>
              ))}
            </div>
          </div>
          <Link to="/products" className="text-sm font-medium hover:text-brand-600">Catalog</Link>
        </nav>

        <form onSubmit={goSearch} className="relative hidden w-full max-w-md md:block">
          <label className="sr-only" htmlFor="search">Search</label>
          <input id="search" className="input pr-10" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} aria-autocomplete="both" aria-expanded={suggestions.length > 0} aria-controls="search-suggestions" />
          <button aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"><Search className="h-5 w-5" /></button>
          {suggestions.length > 0 && (
            <ul id="search-suggestions" className="absolute z-10 mt-1 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-slate-900">
              {suggestions.map(s => (
                <li key={s.id}>
                  <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5" onClick={() => navigate(`/products/${s.id}`)}>{s.title}</button>
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="flex items-center gap-3">
          <Link to="/account" className="glass inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
            <User className="h-4 w-4" /> <span className="hidden sm:inline">{profile?.name || 'Account'}</span>
          </Link>
          <Link to="/account#wishlist" className="glass rounded-xl p-2" aria-label="Wishlist"><Heart className="h-5 w-5" /></Link>
          <button onClick={onOpenCart} className="relative glass rounded-xl p-2" aria-label="Open cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="pill absolute -right-1 -top-1 bg-brand-600 text-white">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
