import { Camera } from 'lucide-react';
import type { Branch } from '@/data/locations';

interface ShowcaseProps {
  branch: Branch;
}

export default function Showcase({ branch }: ShowcaseProps) {
  const images = branch.salonGallery.slice(0, 6);

  return (
    <section id="showcase" className="bg-[#F4FBF8] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sage-700 shadow-sm">
            <Camera className="h-3.5 w-3.5" /> Salon Showcase
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Inside {branch.name}</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">A glimpse of our spaces, styling stations and finishes.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, i) => (
            <div
              key={`${branch.id}-show-${i}`}
              className={`group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-900/5 ${
                i === 0 ? 'col-span-2 row-span-2 sm:col-span-2' : ''
              }`}
            >
              <img
                src={src}
                alt={`${branch.name} showcase ${i + 1}`}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  i === 0 ? 'h-full min-h-[220px] sm:min-h-[300px]' : 'h-40 sm:h-48'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
