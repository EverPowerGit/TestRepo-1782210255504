import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/views/Home';
import Catalog from '@/views/Catalog';
import ProductDetail from '@/views/ProductDetail';
import CartPage from '@/views/CartPage';
import Checkout from '@/views/Checkout';
import Account from '@/views/Account';
import SearchResults from '@/views/SearchResults';
import NotFound from '@/components/Shared/NotFound';
import Loading from '@/components/Shared/Loading';
import { useEffect, useState } from 'react';
import { ContractService } from '@/services/contract-service';
import OrderSuccess from '@/views/OrderSuccess';

export default function AppRoutes() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      try {
        await ContractService.getInstance().init();
        setReady(true);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to initialize HotPocket client. Please set VITE_CONTRACT_URLS or enable mock mode.'
        );
      }
    };
    init();
  }, []);

  useEffect(() => {
    // basic SEO title updates based on route
    const base = 'Retail Market';
    const map: Record<string, string> = {
      '/': `${base} — Shop Modern Deals`,
      '/products': `${base} — Catalog`,
      '/cart': `${base} — Cart`,
      '/checkout': `${base} — Checkout`,
      '/account': `${base} — Account`,
      '/search': `${base} — Search`
    };
    document.title = map[location.pathname] ?? base;
  }, [location.pathname]);

  if (error) return <div className="mx-auto max-w-2xl p-6"><p className="rounded-xl bg-rose-100 px-3 py-2 text-rose-700">{error}</p></div>;
  if (!ready) return <Loading message="Connecting to HotPocket…" />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Catalog />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<OrderSuccess />} />
        <Route path="account" element={<Account />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
