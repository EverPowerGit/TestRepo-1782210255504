export default function PriceTag({ price }: { price: number }) {
  return <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">${price.toFixed(2)}</span>;
}
