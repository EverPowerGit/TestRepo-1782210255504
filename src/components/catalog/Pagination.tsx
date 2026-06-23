export default function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  if (total <= 1) return null;
  return (
    <div className="mt-6 flex justify-center gap-2">
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)} className={`rounded-lg px-3 py-1 text-sm ${p === page ? 'bg-brand-600 text-white' : 'bg-white/70 dark:bg-white/10'}`} aria-current={p === page ? 'page' : undefined}>
          {p}
        </button>
      ))}
    </div>
  );
}
