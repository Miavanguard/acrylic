import { useState, useEffect } from 'react';
import { Scissors, Info } from 'lucide-react';
import type { Branch } from '@/data/locations';
import ServiceRow from '@/components/ServiceRow';

interface PricingMenuProps {
  branch: Branch;
  onBookService: (categoryId: string, serviceName: string) => void;
}

export default function PricingMenu({ branch, onBookService }: PricingMenuProps) {
  const categories = branch.pricing;
  const [active, setActive] = useState(categories[0]?.id ?? '');

  useEffect(() => {
    setActive(branch.pricing[0]?.id ?? '');
  }, [branch.id, branch.pricing]);

  const current = categories.find((c) => c.id === active) ?? categories[0];

  if (!current) return null;

  return (
    <section id="treatments" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sage-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sage-700">
            <Scissors className="h-3.5 w-3.5" /> Treatment Menu
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Pricing & Services</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            Showing prices for <span className="font-semibold text-sage-700">{branch.name}</span>
          </p>
        </div>

        {branch.pricesByConsultation && (
          <div className="mx-auto mb-6 flex max-w-2xl items-start gap-2 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm font-medium text-gold-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Prices at this branch are subject to consultation. Contact the salon for an exact quote.</span>
          </div>
        )}

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                cat.id === active
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'bg-sage-50 text-slate-700 hover:bg-sage-100 hover:text-sage-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-sage-100 bg-white shadow-sm">
          <div className="bg-sage-700 px-6 py-4">
            <h3 className="font-serif text-xl font-semibold text-white">{current.label}</h3>
          </div>
          <div className="divide-y divide-sage-50 bg-white">
            {current.items.map((item, i) => (
              <ServiceRow
                key={`${branch.id}-${current.id}-${i}`}
                item={item}
                onBook={() => onBookService(current.id, item.name)}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs font-medium text-slate-500">
          * All prices are guidelines and require a consultation prior to treatment.
        </p>
      </div>
    </section>
  );
}
