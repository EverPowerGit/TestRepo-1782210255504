import { useCartStore } from '@/state/useCartStore';
import { Link } from 'react-router-dom';
import PriceTag from '@/components/catalog/PriceTag';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const taxes = subtotal * 0.07;
  const shipping = subtotal > 100 ? 0 : 9.99;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>
        <div className="space-y-4">
          {items.length === 0 ? <p>Your cart is empty.</p> : items.map((line) => (
            <div key={line.product.id} className="card grid grid-cols-12 gap-4 p-4">
              <img src={line.product.images[0]} alt="" className="col-span-3 h-28 w-full rounded-xl object-cover" />
              <div className="col-span-9">
                <p className="font-semibold">{line.product.title}</p>
                <p className="text-sm text-gray-500">{line.product.category}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button className="rounded-lg border px-2 py-1 text-sm dark:border-white/10" onClick={() => updateQuantity(line.product.id, Math.max(1, line.quantity - 1))}>-</button>
                  <span className="text-sm">{line.quantity}</span>
                  <button className="rounded-lg border px-2 py-1 text-sm dark:border-white/10" onClick={() => updateQuantity(line.product.id, line.quantity + 1)}>+</button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <PriceTag price={line.product.price * line.quantity} />
                  <button className="text-sm text-rose-600" onClick={() => removeItem(line.product.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card h-max p-6">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="mt-2 border-t pt-2 font-semibold dark:border-white/10 flex justify-between"><span>Total</span><span>${(subtotal + taxes + shipping).toFixed(2)}</span></div>
        </div>
        <div className="mt-4">
          <input placeholder="Discount code (placeholder)" className="input" />
        </div>
        <Link to="/checkout" className="btn-primary mt-4 inline-flex w-full justify-center">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
