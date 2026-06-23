import { Loader2 } from 'lucide-react';

export default function Loading({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-brand-600" />
        <p className="text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}
