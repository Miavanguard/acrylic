import { useEffect } from 'react';
import { MapPin, X, Check, Clock } from 'lucide-react';
import type { Branch } from '@/data/locations';
import { branches } from '@/data/locations';

interface BranchModalProps {
  open: boolean;
  currentId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function BranchModal({ open, currentId, onSelect, onClose }: BranchModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-sage-100 px-6 py-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-slate-800">Choose Your Branch</h3>
            <p className="text-sm text-slate-500">Pricing, specials and contact details update automatically.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {branches.map((b: Branch) => {
              const isActive = b.id === currentId;
              return (
                <button
                  key={b.id}
                  onClick={() => { onSelect(b.id); onClose(); }}
                  className={`group flex flex-col rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? 'border-sage-500 bg-sage-50 ring-1 ring-sage-300'
                      : 'border-slate-200 hover:border-sage-300 hover:bg-sage-50/50'
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sage-500" />
                      <span className="font-semibold text-slate-800">{b.name}</span>
                    </div>
                    {isActive && <Check className="h-4 w-4 text-sage-600" />}
                  </div>
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                    <Clock className="h-3 w-3" /> Open Today
                  </span>
                  <p className="mb-1 text-xs font-medium text-slate-400 uppercase tracking-wide">{b.area}</p>
                  <p className="text-sm text-slate-500 line-clamp-2">{b.address}</p>
                  {b.isFlagship && (
                    <span className="mt-2 inline-flex w-fit rounded-full bg-gold-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-600">
                      Flagship Branch
                    </span>
                  )}
                  <span className={`mt-3 rounded-lg py-1.5 text-center text-xs font-semibold transition-colors ${
                    isActive ? 'bg-sage-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-sage-100 group-hover:text-sage-700'
                  }`}>
                    {isActive ? 'Current Branch' : 'Select Branch'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
