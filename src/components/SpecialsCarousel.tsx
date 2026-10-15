import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag, Clock } from 'lucide-react';
import type { Special } from '@/data/locations';

interface SpecialsCarouselProps {
  specials: Special[];
  consultationOnly?: boolean;
}

export default function SpecialsCarousel({ specials, consultationOnly }: SpecialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = specials.length;

  useEffect(() => {
    setIndex(0);
  }, [specials]);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => clearInterval(t);
  }, [count]);

  if (count === 0) return null;

  const go = (n: number) => setIndex((i) => (i + n + count) % count);
  const current = specials[index];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-gold-500" />
          <h2 className="font-serif text-xl font-semibold text-slate-900">Active Specials</h2>
        </div>
        {count > 1 && (
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} className="rounded-full border border-slate-200 p-1.5 text-slate-500 transition-colors hover:bg-sage-50 hover:text-sage-600">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => go(1)} className="rounded-full border border-slate-200 p-1.5 text-slate-500 transition-colors hover:bg-sage-50 hover:text-sage-600">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-r from-gold-50 via-white to-blush-50 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {current.badge}
              </span>
              {consultationOnly && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  <Clock className="h-3 w-3" /> Prices subject to consultation
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl font-semibold text-slate-900">{current.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{current.description}</p>
          </div>
          <div className="flex shrink-0 items-end gap-3">
            <span className="text-lg font-medium text-slate-500 line-through">{current.originalPrice}</span>
            <span className="font-serif text-3xl font-bold text-sage-800">{current.salePrice}</span>
          </div>
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="mt-5 flex justify-center gap-1.5">
            {specials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-sage-500' : 'w-2 bg-slate-300'}`}
                aria-label={`Special ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
