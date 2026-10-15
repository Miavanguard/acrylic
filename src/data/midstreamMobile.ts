export interface MobileServiceItem {
  name: string;
  description?: string;
  price: string;
}

export interface MobileServiceCategory {
  id: 'facials' | 'laser' | 'fat-dissolving' | 'skin-tag';
  label: string;
  subtext?: string;
  items: MobileServiceItem[];
}

export const midstreamMobileInfo = {
  title: 'Acrylic Game – Midstream Mobile Aesthetics',
  badge: 'Mobile Service – We Come To You in Midstream',
  description:
    'A specialized mobile aesthetic clinic offering advanced skin, laser, and body treatments — delivered to your door in Midstream and surrounding areas.',
  whatsappNumber: '27836172389',
  practitionerName: 'Theola',
  practitionerRole: 'Treatments & Injections',
  practitionerPhone: '0835014723',
  practitionerNumber: '27835014723',
  hours: 'By appointment · Mobile service within Midstream & nearby areas',
};

export const midstreamMobilePricing: MobileServiceCategory[] = [
  {
    id: 'facials',
    label: 'Hydra Facials & Microneedling',
    items: [
      {
        name: 'Standard Hydra Facial (60 min)',
        description: 'Deep cleansing, exfoliation, extraction, hydration, RF skin tightening, cold press, and jelly mask.',
        price: 'R800',
      },
      {
        name: 'Hydra-Peel',
        description: 'Standard hydra facial + custom brightening/hydrating peel.',
        price: 'R950',
      },
      {
        name: 'Hydra-Plane',
        description: 'Dermaplaning combined with standard hydra facial.',
        price: 'R1100',
      },
      {
        name: 'Hydra-Needle (Hydra Facial + Microneedling)',
        description: 'Combines hydra facial with microneedling for collagen production, acne scars, texture, and pigmentation.',
        price: 'R1500',
      },
    ],
  },
  {
    id: 'laser',
    label: 'Laser Hair Removal (Mobile)',
    subtext: 'Safe, effective, pain-free mobile laser treatments. Note: R50 fee applies if area is not pre-shaved.',
    items: [
      { name: 'Half Face', price: 'R300' },
      { name: 'Full Face', price: 'R500' },
      { name: 'Lip', price: 'R150' },
      { name: 'Chin', price: 'R200' },
      { name: 'Cheeks', price: 'R200' },
      { name: 'Neck', price: 'R280' },
      { name: 'Face & Neck', price: 'R700' },
      { name: 'Unibrow', price: 'R100' },
      { name: 'Sideburns', price: 'R250' },
      { name: 'Jawline', price: 'R230' },
      { name: 'Underarms', price: 'R280' },
      { name: 'Full Arms', price: 'R750' },
      { name: 'Half Arms', price: 'R550' },
      { name: 'Full Legs', price: 'R1200' },
      { name: 'Half Legs', price: 'R650' },
      { name: 'Bikini', price: 'R370' },
      { name: 'Brazilian', price: 'R500' },
      { name: 'Hollywood', price: 'R600' },
      { name: 'Full Back', price: 'R750' },
      { name: 'Stomach', price: 'R250' },
      { name: 'Chest', price: 'R600' },
    ],
  },
  {
    id: 'fat-dissolving',
    label: 'Fat Dissolving Injections (Lemonbottle & Lipo)',
    subtext:
      'Target areas: Double chin, belly, love handles, bra fat, back, arms, thighs. Lemonbottle Natural Lipolysis — zero downtime, fast results.',
    items: [
      { name: '1–5 Injections', description: 'Per injection', price: 'R300 ea' },
      { name: '6–10 Injections', description: 'Per injection', price: 'R280 ea' },
      { name: '11–15 Injections', description: 'Per injection', price: 'R250 ea' },
      { name: 'Value Package — 10x Injections', price: 'R1500' },
      { name: 'Value Package — 20x Injections', price: 'R2700' },
    ],
  },
  {
    id: 'skin-tag',
    label: 'Skin Tag & Mole Removal (Cauterisation)',
    subtext: 'Area numbed prior to treatment for your comfort.',
    items: [
      { name: '1–20 mins', price: 'R550' },
      { name: '20–40 mins', price: 'R800' },
      { name: '40–60 mins', price: 'R1000' },
    ],
  },
];

export function buildMobileWhatsAppLink(serviceName?: string): string {
  const msg = serviceName
    ? `Hi Acrylic Game Midstream Mobile Aesthetics! I'd like to book: ${serviceName}.`
    : "Hi Acrylic Game Midstream Mobile Aesthetics! I'd like to book a mobile treatment.";
  return `https://wa.me/${midstreamMobileInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function buildPractitionerLink(serviceName?: string): string {
  const msg = serviceName
    ? `Hi Theola, I'd like to book: ${serviceName} at Acrylic Game Midstream Mobile.`
    : "Hi Theola, I'd like to book a treatment at Acrylic Game Midstream Mobile.";
  return `https://wa.me/${midstreamMobileInfo.practitionerNumber}?text=${encodeURIComponent(msg)}`;
}
