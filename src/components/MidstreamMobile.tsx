import { useState, useEffect } from 'react';
import { Sparkles, Zap, Droplets, ScanLine, MessageCircle, Phone, ArrowLeft, Truck, Syringe } from 'lucide-react';
import {
  midstreamMobileInfo,
  midstreamMobilePricing,
  buildMobileWhatsAppLink,
  buildPractitionerLink,
  type MobileServiceCategory,
} from '@/data/midstreamMobile';

interface MidstreamMobileProps {
  onBack: () => void;
}

const tabIcons: Record<MobileServiceCategory['id'], typeof Zap> = {
  facials: Droplets,
  laser: Zap,
  'fat-dissolving': Syringe,
  'skin-tag': ScanLine,
};

export default function MidstreamMobile({ onBack }: MidstreamMobileProps) {
  const [active, setActive] = useState<MobileServiceCategory['id']>('facials');
  const current = midstreamMobilePricing.find((c) => c.id === active) ?? midstreamMobilePricing[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#F4FBF8]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-sage-500/50 px-4 py-1.5 text-sm font-semibold transition-colors hover:border-sage-400 hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Salon
          </button>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-sage-400" />
            <span className="font-semibold">{midstreamMobileInfo.badge}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-100 via-white to-[#F4FBF8]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blush-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-sage-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm sm:text-sm">
              <Truck className="h-4 w-4" />
              {midstreamMobileInfo.badge}
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
              Midstream Mobile
              <span className="mt-1 block bg-gradient-to-r from-sage-700 to-sage-500 bg-clip-text text-transparent">
                Aesthetics
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {midstreamMobileInfo.description}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={buildMobileWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Book via WhatsApp
              </a>
              <a
                href={`tel:${midstreamMobileInfo.practitionerPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sage-400 bg-white px-7 py-3.5 font-semibold text-slate-800 transition-all hover:border-sage-600 hover:bg-sage-50"
              >
                <Phone className="h-5 w-5 text-sage-600" />
                Call Theola
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="font-medium">WhatsApp: {midstreamMobileInfo.whatsappNumber}</span>
              <span className="hidden h-4 w-px bg-slate-300 sm:block" />
              <span className="font-medium">
                {midstreamMobileInfo.practitionerName} ({midstreamMobileInfo.practitionerRole}): {midstreamMobileInfo.practitionerPhone}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{midstreamMobileInfo.hours}</p>
          </div>
        </div>
      </section>

      {/* Service menu */}
      <section id="mobile-treatments" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sage-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> Treatment Menu
            </div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Services &amp; Pricing</h2>
          </div>

          {/* Filter tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {midstreamMobilePricing.map((cat) => {
              const Icon = tabIcons[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    cat.id === active
                      ? 'bg-sage-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-sage-50 hover:text-sage-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label.split(' (')[0]}
                </button>
              );
            })}
          </div>

          {/* Subtext */}
          {current.subtext && (
            <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-sage-200 bg-white px-5 py-3.5 text-sm font-medium leading-relaxed text-slate-700 shadow-sm">
              {current.subtext}
            </div>
          )}

          {/* Service cards */}
          <div className="overflow-hidden rounded-2xl border border-sage-100 bg-white shadow-sm">
            <div className="bg-sage-700 px-6 py-4">
              <h3 className="font-serif text-xl font-semibold text-white">{current.label}</h3>
            </div>
            <div className="divide-y divide-sage-50">
              {current.items.map((item, i) => (
                <div
                  key={`${current.id}-${i}`}
                  className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-[#F4FBF8] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    {item.description && (
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 font-serif text-lg font-bold text-sage-700">{item.price}</span>
                    <a
                      href={buildMobileWhatsAppLink(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practitioner CTA */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-sage-200 bg-white p-6 shadow-sm sm:flex-row">
            <div>
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                Injections &amp; Advanced Treatments
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Book directly with {midstreamMobileInfo.practitionerName} ({midstreamMobileInfo.practitionerRole}) for fat dissolving, skin tag removal, and injectables.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={buildPractitionerLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Theola
              </a>
              <a
                href={`tel:${midstreamMobileInfo.practitionerPhone}`}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-sage-400 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-sage-50"
              >
                <Phone className="h-4 w-4 text-sage-600" />
                Call
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-medium text-slate-500">
            * All prices are guidelines and require a consultation prior to treatment. Mobile service available within Midstream &amp; nearby areas.
          </p>
        </div>
      </section>
    </div>
  );
}
