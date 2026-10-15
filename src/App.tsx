import { useState } from 'react';
import { branches, getBranchById } from '@/data/locations';
import Header from '@/components/Header';
import BranchModal from '@/components/BranchModal';
import Hero from '@/components/Hero';
import PricingMenu from '@/components/PricingMenu';
import Gallery from '@/components/Gallery';
import Showcase from '@/components/Showcase';
import LocationsDirectory from '@/components/LocationsDirectory';
import MidstreamMobile from '@/components/MidstreamMobile';

function App() {
  const [branchId, setBranchId] = useState(branches[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const branch = getBranchById(branchId);

  if (showMobile) {
    return <MidstreamMobile onBack={() => setShowMobile(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        logoUrl={branch.logoUrl}
        branch={branch}
        onChangeLocation={() => setModalOpen(true)}
        onOpenMobile={() => setShowMobile(true)}
      />
      <BranchModal
        open={modalOpen}
        currentId={branchId}
        onSelect={setBranchId}
        onClose={() => setModalOpen(false)}
      />
      <main>
        <Hero branch={branch} />
        <PricingMenu branch={branch} />
        <Gallery branch={branch} />
        <Showcase branch={branch} />
        <LocationsDirectory currentId={branchId} onSelect={setBranchId} onOpenMobile={() => setShowMobile(true)} />
      </main>
    </div>
  );
}

export default App;
