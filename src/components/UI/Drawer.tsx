import { useEffect, useRef } from 'react';

export default function Drawer({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: React.ReactNode; title?: string; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title || 'Panel'} className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white p-4 shadow-2xl transition-transform dark:bg-slate-900 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {children}
      </div>
    </div>
  );
}
