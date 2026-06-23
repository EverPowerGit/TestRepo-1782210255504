import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { hideSnackbar } from '@/features/snackbar/snackbarSlice';
import { CircleAlert, CircleCheck, XCircle, Info } from 'lucide-react';

export default function Snackbar() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((s: RootState) => s.snackbar);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => dispatch(hideSnackbar()), 3000);
    return () => clearTimeout(t);
  }, [open, dispatch]);

  if (!open) return null;

  const iconCls = 'h-5 w-5';
  const icon = type === 'success' ? (
    <CircleCheck className={iconCls} />
  ) : type === 'error' ? (
    <XCircle className={iconCls} />
  ) : type === 'warning' ? (
    <CircleAlert className={iconCls} />
  ) : (
    <Info className={iconCls} />
  );

  const bg =
    type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : type === 'warning' ? 'bg-amber-600' : 'bg-brand-600';

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className={`flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-xl ${bg}`} role="status" aria-live="polite">
        {icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
