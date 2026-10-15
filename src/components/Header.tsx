import { Instagram, MapPin, Scissors, Truck } from 'lucide-react';
import type { Branch } from '@/data/locations';

interface HeaderProps {
  logoUrl?: string;
  branch: Branch;
  onChangeLocation: () => void;
  onOpenMobile: () => void;
}

export default function Header({ logoUrl, branch, onChangeLocation, onOpenMobile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      {/* Branch bar */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-sage-400" />
            <span className="truncate font-medium">
              <span className="font-bold text-white">{branch.name}</span>
              <span className="hidden text-slate-300 sm:inline"> · {branch.area}</span>
              {branch.isFlagship && (
                <span className="ml-2 hidden rounded-full bg-gold-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-300 sm:inline">
                  Flagship
                </span>
              )}
            </span>
          </div>
          <button
            onClick={onChangeLocation}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-sage-500/50 px-3.5 py-1.5 font-semibold text-white transition-colors hover:border-sage-400 hover:bg-slate-800"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Change Location</span>
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-sage-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Acrylic Game" className="h-10 w-auto rounded object-contain" />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 shadow-sm">
                <Scissors className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="leading-tight">
              <p className="font-serif text-lg font-semibold tracking-tight text-slate-800">{branch.id === 'durban' ? 'Acrylic Game Durban' : 'Acrylic Game'}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-sage-500">{branch.logoTagline ?? 'Hair &amp; Beauty Studio'}</p>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#treatments" className="transition-colors hover:text-sage-600">Treatments</a>
            <a href="#gallery" className="transition-colors hover:text-sage-600">Transformations</a>
            <a href="#showcase" className="transition-colors hover:text-sage-600">Showcase</a>
            <a href="#locations" className="transition-colors hover:text-sage-600">Locations</a>
            <button onClick={onOpenMobile} className="inline-flex items-center gap-1.5 text-sage-600 transition-colors hover:text-sage-800">
              <Truck className="h-4 w-4" />
              Mobile Aesthetics
            </button>
          </nav>
          <div className="flex items-center gap-3">
            {branch.instagramUrl && (
              <a
                href={branch.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${branch.name} on Instagram`}
                className="hidden items-center gap-1.5 text-sm font-semibold text-sage-700 transition-colors hover:text-sage-900 sm:inline-flex"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            )}
            <a
              href="#treatments"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
