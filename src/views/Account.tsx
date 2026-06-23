import { useMemo } from 'react';
import { useUserStore } from '@/state/useUserStore';
import { products } from '@/data/products';

export default function Account() {
  const { profile, setProfile, wishlist } = useUserStore();
  const wishItems = useMemo(() => products.filter((p) => wishlist.includes(p.id)), [wishlist]);
  const orders = [
    { id: 'ord_001', total: 129.98, date: '2026-04-12', status: 'Delivered' },
    { id: 'ord_002', total: 59.5, date: '2026-05-02', status: 'Processing' },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card p-6">
        <h2 className="text-lg font-bold">Profile</h2>
        <div className="mt-4 space-y-3">
          <input placeholder="Name" className="input" value={profile?.name ?? ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input placeholder="Email" className="input" value={profile?.email ?? ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <p className="text-xs text-gray-500">No real auth. Stored in localStorage.</p>
        </div>
      </div>
      <div className="card p-6 lg:col-span-2" id="wishlist">
        <h2 className="text-lg font-bold">Wishlist</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishItems.length === 0 ? <p className="text-sm text-gray-500">No items yet.</p> : wishItems.map(p => (
            <div key={p.id} className="rounded-xl border p-3 dark:border-white/10">
              <img src={p.images[0]} alt="" className="h-28 w-full rounded-lg object-cover" />
              <p className="mt-2 text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-gray-500">${p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6 lg:col-span-3" id="orders">
        <h2 className="text-lg font-bold">Orders</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 dark:text-gray-300">
                <th className="p-2">Order ID</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t dark:border-white/10">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.date}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
