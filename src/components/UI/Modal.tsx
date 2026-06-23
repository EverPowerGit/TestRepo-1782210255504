import { useEffect } from 'react';

export default function Modal({ open, onClose, children, labelledBy }: { open: boolean; onClose: () => void; children: React.ReactNode; labelledBy?: string; }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="card relative w-full max-w-lg p-6">{children}</div>
    </div>
  );
}
