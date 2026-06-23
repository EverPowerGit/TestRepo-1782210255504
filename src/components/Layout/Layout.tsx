import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Snackbar from '@/components/Shared/Snackbar';
import Drawer from '@/components/UI/Drawer';
import { useState } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { useTheme } from '@/components/Shared/ThemeContext';
import { Settings } from 'lucide-react';

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 dark:text-gray-100">
      <Header onOpenCart={() => setCartOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <button aria-label="Toggle theme" onClick={toggle} className="fixed bottom-6 right-6 rounded-full bg-white/80 p-3 shadow-xl backdrop-blur hover:-translate-y-0.5 hover:shadow-2xl dark:bg-white/10" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        <Settings className="h-5 w-5" />
      </button>

      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Shopping Cart">
        <CartDrawer onClose={() => setCartOpen(false)} />
      </Drawer>

      <Footer />
      <Snackbar />
    </div>
  );
}
