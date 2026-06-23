import { useCartStore } from '@/state/useCartStore';
import PriceTag from '@/components/catalog/PriceTag';
import { Link } from 'react-router-dom';

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-lg font-bold">Your Cart</h2>
      <div className="flex-1 space-y-3 overflow-auto pr-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No items added yet.</p>
        ) : (
          items.map((line) => (
            <div key={line.product.id} className="flex gap-3 rounded-xl border p-3 dark:border-white/10">
              <img src={line.product.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{line.product.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <button aria-label="Decrease" className="rounded-lg border px-2 py-1 text-sm dark:border-white/10" onClick={() => updateQuantity(line.product.id, Math.max(1, line.quantity - 1))}>-</button>
                  <span className="text-sm">{line.quantity}</span>
                  <button aria-label="Increase" className="rounded-lg border px-2 py-1 text-sm dark:border-white/10" onClick={() => updateQuantity(line.product.id, line.quantity + 1)}>+</button>
                </div>
                <button className="mt-2 text-xs text-rose-600" onClick={() => removeItem(line.product.id)}>Remove</button>
              </div>
              <PriceTag price={line.product.price * line.quantity} />
            </div>
          ))
        )}
      </div>
      <div className="mt-4 border-t pt-4 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm">Subtotal</span>
          <PriceTag price={subtotal} />
        </div>
        <p className="mt-1 text-xs text-gray-500">Taxes and shipping calculated at checkout.</p>
        <div className="mt-4 flex gap-2">
          <Link to="/cart" onClick={onClose} className="glass flex-1 rounded-xl px-4 py-2 text-center">View Cart</Link>
          <Link to="/checkout" onClick={onClose} className="btn-primary flex-1 text-center">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
