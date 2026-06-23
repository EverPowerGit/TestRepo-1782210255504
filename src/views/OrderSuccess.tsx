import { Link } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="card mx-auto max-w-lg p-8 text-center">
      <CircleCheck className="mx-auto h-14 w-14 text-emerald-600" />
      <h1 className="mt-4 text-2xl font-bold">Order Confirmed</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Thank you! Your order has been placed successfully.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/" className="glass rounded-xl px-4 py-2">Continue Shopping</Link>
        <Link to="/account#orders" className="btn-primary">View Orders</Link>
      </div>
    </div>
  );
}
