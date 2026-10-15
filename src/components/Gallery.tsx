import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { Branch } from '@/data/locations';
import BeforeAfterSlider from './BeforeAfterSlider';

interface GalleryProps {
  branch: Branch;
}

const filters = ['All', 'Balayage', 'Treatments', 'Extensions', 'Styling'] as const;

export default function Gallery({ branch }: GalleryProps) {
  const [filter, setFilter] = useState<typeof filters[number]>('All');

  useEffect(() => {
    setFilter('All');
  }, [branch.id]);

  const items = branch.beforeAfterGallery.filter((t) => filter === 'All' || t.category === filter);

  return (
    <section id="gallery" className="bg-gradient-to-b from-sage-50 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blush-700">
            <Sparkles className="h-3.5 w-3.5" /> Transformations
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Before &amp; After Gallery</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">Drag the slider to reveal each transformation at {branch.name}.</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                f === filter
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-sage-50 hover:text-sage-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-sage-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
              <BeforeAfterSlider item={item} />
              <div className="px-2 pt-3 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-slate-900">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-sage-100 px-2.5 py-0.5 text-[11px] font-semibold text-sage-700">{item.category}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
