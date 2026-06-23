import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-300">
        {items.map((it, idx) => (
          <li key={it.label} className="flex items-center gap-2">
            {it.to ? <Link className="hover:text-brand-600" to={it.to}>{it.label}</Link> : <span className="font-medium">{it.label}</span>}
            {idx < items.length - 1 && <span aria-hidden> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
