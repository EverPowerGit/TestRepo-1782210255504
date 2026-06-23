import { useState } from 'react';
import { useCartStore } from '@/state/useCartStore';
import { ApiService } from '@/services/api-service';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const { items, clear } = useCartStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', postal: '', country: '', cardNumber: '', expiry: '', cvc: ''
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.address) { setError('Please complete required fields.'); return; }
    if (items.length === 0) { setError('Your cart is empty.'); return; }
    try {
      setLoading(true);
      const api = ApiService.getInstance();
      const orderInput = {
        customerName: form.name,
        email: form.email,
        shippingAddress: `${form.address}, ${form.city}, ${form.postal}, ${form.country}`,
        lines: items.map(i => ({ productId: i.product.id, title: i.product.title, price: i.product.price, quantity: i.quantity })),
      };
      await api.createOrder(orderInput);
      clear();
      navigate('/checkout/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <h2 className="text-xl font-bold">Checkout</h2>
      {error && <p className="rounded-xl bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="name">Full Name</label>
          <input id="name" className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" className="input mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium" htmlFor="address">Address</label>
          <input id="address" className="input mt-1" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="city">City</label>
          <input id="city" className="input mt-1" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="postal">Postal Code</label>
          <input id="postal" className="input mt-1" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="country">Country</label>
          <input id="country" className="input mt-1" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-medium">Payment (mock)</p>
          <div className="mt-2 grid gap-4 md:grid-cols-3">
            <input placeholder="Card Number" className="input" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} />
            <input placeholder="MM/YY" className="input" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
            <input placeholder="CVC" className="input" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} />
          </div>
        </div>
      </div>
      <button className="btn-primary" disabled={loading}>{loading ? 'Processing…' : 'Place Order'}</button>
    </form>
  );
}
