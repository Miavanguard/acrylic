import { MessageCircle, Scissors, Star, Sparkles } from 'lucide-react';
import type { Branch } from '@/data/locations';
import { buildWhatsAppLink } from '@/data/locations';
import SpecialsCarousel from './SpecialsCarousel';

interface HeroProps {
  branch: Branch;
}

export default function Hero({ branch }: HeroProps) {
  const whatsappLink = buildWhatsAppLink(branch);

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-sage-50 via-white to-sage-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blush-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white px-4 py-1.5 text-xs font-semibold text-sage-700 shadow-sm sm:text-sm">
              <Sparkles className="h-4 w-4 text-gold-500" />
              Now booking at {branch.name}
              {branch.isFlagship && <span className="text-gold-600">· Flagship</span>}
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {branch.id === 'parkhurst' ? branch.name : 'Acrylic Game'}
              <span className="mt-1 block bg-gradient-to-r from-sage-700 to-sage-500 bg-clip-text text-transparent">
                {branch.id === 'sunninghill'
                  ? 'Skin &amp; Aesthetics Studio'
                  : branch.id === 'parkhurst'
                    ? 'Aesthetics &amp; Skin Clinic'
                    : 'Hair &amp; Beauty Studio'}
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
              {branch.isFlagship ? 'Rivonia Junction Flagship Branch' : `${branch.name} (${branch.area})`}
              {' — '}
              {branch.id === 'sunninghill'
                ? 'nails, waxing, laser hair removal, iS Clinical facials, skin resurfacing, permanent makeup & body treatments.'
                : branch.id === 'parkhurst'
                  ? 'Korean head spa, hydrafacials, waxing, laser hair removal, slimming, pedicures & nails.'
                  : branch.id === 'durban'
                    ? 'nails, waxing & threading, lashes & brows, hydra facials, microneedling, dermaplaning & specialised treatments.'
                    : 'premium hair treatments, colour, balayage, keratin & natural hair care.'}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Book on WhatsApp
              </a>
              <a
                href="#treatments"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sage-400 bg-white px-7 py-3.5 font-semibold text-slate-800 transition-all hover:border-sage-600 hover:bg-sage-50"
              >
                <Scissors className="h-5 w-5 text-sage-600" />
                Explore {branch.id === 'sunninghill' || branch.id === 'parkhurst' ? 'Treatment Menu' : 'Treatment Menu'}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">5.0 · Loved by clients</span>
              </div>
              <span className="hidden h-4 w-px bg-slate-300 sm:block" />
              <span className="font-medium text-slate-600">{branch.hours}</span>
            </div>
          </div>

          {/* Image card with dark gradient for text pop */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/10">
              <img
                src={branch.heroImage}
                alt={`${branch.name} salon interior`}
                className="h-[360px] w-full object-cover sm:h-[460px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif text-2xl font-semibold text-white drop-shadow-lg sm:text-3xl">
                  {branch.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-white/90 drop-shadow">
                  {branch.area} · {branch.isFlagship ? 'Flagship Branch' : branch.id === 'parkhurst' ? 'Acrylic Game' : 'Acrylic Game Studio'}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-900/5 sm:block">
              <p className="font-serif text-2xl font-bold text-sage-600">5</p>
              <p className="text-xs font-medium text-slate-600">SA Branches</p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <SpecialsCarousel specials={branch.specials} consultationOnly={branch.pricesByConsultation} />
        </div>
      </div>
    </section>
  );
}
