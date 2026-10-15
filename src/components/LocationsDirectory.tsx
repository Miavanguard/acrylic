import { MapPin, Phone, MessageCircle, Clock, Instagram, Truck, Music2, Facebook } from 'lucide-react';
import type { Branch } from '@/data/locations';
import { branches, buildWhatsAppLink } from '@/data/locations';

interface LocationsDirectoryProps {
  currentId: string;
  onSelect: (id: string) => void;
  onOpenMobile: () => void;
}

export default function LocationsDirectory({ currentId, onSelect, onOpenMobile }: LocationsDirectoryProps) {
  return (
    <section id="locations" className="bg-[#F4FBF8] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sage-700 shadow-sm">
            <MapPin className="h-3.5 w-3.5" /> Find Us
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Our Salon Locations</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">Five branches across South Africa — find your nearest Acrylic Game.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b: Branch) => {
            const isCurrent = b.id === currentId;
            return (
              <div
                key={b.id}
                className={`flex flex-col rounded-2xl border p-5 shadow-sm transition-all ${
                  isCurrent ? 'border-sage-500 bg-white ring-1 ring-sage-300' : 'border-sage-100 bg-white hover:border-sage-300 hover:shadow-md'
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {b.logoUrl && (
                      <img src={b.logoUrl} alt={`${b.name} logo`} className="h-12 w-12 rounded-lg object-cover ring-1 ring-sage-100" />
                    )}
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-slate-900">{b.name}</h3>
                      <span className="text-xs font-semibold uppercase tracking-wide text-sage-600">{b.area}</span>
                    </div>
                  </div>
                  {b.isFlagship && (
                    <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-700">
                      Flagship
                    </span>
                  )}
                </div>

                <div className="mb-4 space-y-2.5 text-sm leading-relaxed text-slate-700">
                  <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {b.address}</p>
                  <p className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {b.hours}</p>
                  <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {b.phone}</p>
                  <a
                    href={b.instagramUrl ?? `https://instagram.com/${b.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 font-medium text-sage-700 transition-colors hover:text-sage-900"
                  >
                    <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {b.instagramHandle}
                  </a>
                  {b.tiktokUrl && (
                    <a
                      href={b.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 font-medium text-sage-700 transition-colors hover:text-sage-900"
                    >
                      <Music2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> TikTok
                    </a>
                  )}
                  {b.facebookPage && (
                    <span className="flex gap-2 text-slate-700">
                      <Facebook className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {b.facebookPage}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex gap-2">
                  <a
                    href={buildWhatsAppLink(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" /> Book
                  </a>
                  <button
                    onClick={() => onSelect(b.id)}
                    className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isCurrent ? 'bg-sage-600 text-white' : 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                    }`}
                  >
                    {isCurrent ? 'Current' : 'View'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Midstream Mobile Aesthetics promotional card */}
          <div className="flex flex-col rounded-2xl border-2 border-sage-500 bg-gradient-to-br from-sage-50 to-white p-5 shadow-sm ring-1 ring-sage-200">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-slate-900">Midstream Mobile Aesthetics</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-sage-600">Mobile Service</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-sage-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                <Truck className="h-3 w-3" /> Mobile
              </span>
            </div>

            <div className="mb-4 space-y-2.5 text-sm leading-relaxed text-slate-700">
              <p className="flex gap-2"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> We come to you in Midstream &amp; nearby areas</p>
              <p className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> By appointment</p>
              <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> WhatsApp: 083 617 2389</p>
              <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> Theola (Injections): 083 501 4723</p>
            </div>

            <p className="mb-4 text-sm text-slate-600">Advanced skin, laser &amp; body treatments delivered to your door.</p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={onOpenMobile}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sage-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
              >
                <Truck className="h-4 w-4" /> View Services
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-medium text-slate-500">
          * All prices are guidelines and require a consultation prior to treatment.
        </p>
      </div>
    </section>
  );
}
