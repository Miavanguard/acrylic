import { useEffect, useState } from 'react';
import { branches, getBranchById } from '@/data/locations';
import { BRANCH_STORAGE_KEY } from '@/lib/booking';
import Header from '@/components/Header';
import BranchModal from '@/components/BranchModal';
import Hero from '@/components/Hero';
import PricingMenu from '@/components/PricingMenu';
import Gallery from '@/components/Gallery';
import Showcase from '@/components/Showcase';
import LocationsDirectory from '@/components/LocationsDirectory';
import MidstreamMobile from '@/components/MidstreamMobile';
import BookingModal from '@/components/BookingModal';
import SiteFooter from '@/components/SiteFooter';
import AdminPage from '@/components/AdminPage';
import type { BookingTarget } from '@/types/booking';

function readStoredBranchId(): string {
  try {
    const stored = localStorage.getItem(BRANCH_STORAGE_KEY);
    if (stored && branches.some((branch) => branch.id === stored)) return stored;
  } catch {
    /* Storage can be blocked in private browsing. */
  }
  return branches[0].id;
}

function SalonSite() {
  const [branchId, setBranchId] = useState(readStoredBranchId);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [booking, setBooking] = useState<BookingTarget | null>(null);
  const branch = getBranchById(branchId);

  useEffect(() => {
    try {
      localStorage.setItem(BRANCH_STORAGE_KEY, branchId);
    } catch {
      /* Ignore storage failures. */
    }
  }, [branchId]);

  function openBooking(partial: Omit<BookingTarget, 'token'>) {
    setBooking({ ...partial, token: Date.now() });
  }

  const bookingModal = <BookingModal target={booking} onClose={() => setBooking(null)} />;

  if (showMobile) {
    return (
      <>
        <MidstreamMobile
          onBack={() => setShowMobile(false)}
          onBook={(categoryId, serviceName) => openBooking({ kind: 'mobile', categoryId, serviceName })}
        />
        <SiteFooter />
        {bookingModal}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        logoUrl={branch.logoUrl}
        branch={branch}
        onChangeLocation={() => setModalOpen(true)}
        onOpenMobile={() => setShowMobile(true)}
        onBook={() => openBooking({ kind: 'branch', branchId })}
      />
      <BranchModal
        open={modalOpen}
        currentId={branchId}
        onSelect={setBranchId}
        onClose={() => setModalOpen(false)}
      />
      <main>
        <Hero branch={branch} onBook={() => openBooking({ kind: 'branch', branchId })} />
        <PricingMenu
          branch={branch}
          onBookService={(categoryId, serviceName) => openBooking({ kind: 'branch', branchId, categoryId, serviceName })}
        />
        <Gallery branch={branch} />
        <Showcase branch={branch} />
        <LocationsDirectory
          currentId={branchId}
          onSelect={setBranchId}
          onOpenMobile={() => setShowMobile(true)}
          onBook={(id) => openBooking({ kind: 'branch', branchId: id })}
        />
      </main>
      <SiteFooter />
      {bookingModal}
    </div>
  );
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  if (path.replace(/\/$/, '') === '/admin') return <AdminPage />;
  return <SalonSite />;
}

export default App;
