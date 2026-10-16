import { ChevronRight } from 'lucide-react';
import type { Service } from '@/data/locations';
import { formatServicePrice, isBookableService, serviceDetail } from '@/lib/booking';

interface ServiceRowProps {
  item: Service;
  onBook?: () => void;
}

export default function ServiceRow({ item, onBook }: ServiceRowProps) {
  const detail = serviceDetail(item);
  const price = formatServicePrice(item);
  const bookable = Boolean(onBook) && isBookableService(item);

  const body = (
    <>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">{item.name}</p>
        {detail && <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{detail}</p>}
      </div>
      <span className="shrink-0 font-serif text-lg font-bold text-sage-700">{price}</span>
      {bookable && (
        <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-sage-700">
          Book
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      )}
    </>
  );

  if (!bookable) {
    return <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">{body}</div>;
  }

  return (
    <button
      type="button"
      onClick={onBook}
      aria-label={`Book ${item.name}, ${price}`}
      className="flex min-h-14 w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[#F4FBF8] active:bg-sage-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage-600 sm:px-6"
    >
      {body}
    </button>
  );
}
