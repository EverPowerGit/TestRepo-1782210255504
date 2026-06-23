import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Page not found</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          <Home className="h-4 w-4" />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
