export interface Special {
  id: string;
  title: string;
  description: string;
  badge: string;
  originalPrice: string;
  salePrice: string;
}

export interface Service {
  name: string;
  description?: string;
  price: string;
}

export type ServiceItem = Service;

export interface ServiceCategory {
  id: string;
  label: string;
  items: ServiceItem[];
}

export interface Transformation {
  id: string;
  title: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  category: 'Balayage' | 'Treatments' | 'Extensions' | 'Styling';
}

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappLink?: string;
  instagramHandle: string;
  instagramUrl?: string;
  logoUrl?: string;
  logoTagline?: string;
  tiktokUrl?: string;
  facebookPage?: string;
  hours: string;
  isFlagship?: boolean;
  pricesByConsultation?: boolean;
  specials: Special[];
  pricing: ServiceCategory[];
  heroImage: string;
  salonGallery: string[];
  beforeAfterGallery: Transformation[];
}

/* ---------- Image pools ---------- */

const img = {
  interior1: 'https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior2: 'https://images.pexels.com/photos/7195799/pexels-photo-7195799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior3: 'https://images.pexels.com/photos/7195812/pexels-photo-7195812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior4: 'https://images.pexels.com/photos/7195796/pexels-photo-7195796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior5: 'https://images.pexels.com/photos/7195811/pexels-photo-7195811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior6: 'https://images.pexels.com/photos/7750124/pexels-photo-7750124.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  reception1: 'https://images.pexels.com/photos/7195810/pexels-photo-7195810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  salonGreen: 'https://images.pexels.com/photos/7750120/pexels-photo-7750120.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  salonLondon: 'https://images.pexels.com/photos/27165072/pexels-photo-27165072.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  styling1: 'https://images.pexels.com/photos/14615063/pexels-photo-14615063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  treatment1: 'https://images.pexels.com/photos/7755473/pexels-photo-7755473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  foil1: 'https://images.pexels.com/photos/29555682/pexels-photo-29555682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  iron1: 'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cut1: 'https://images.pexels.com/photos/3992875/pexels-photo-3992875.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  blowdry1: 'https://images.pexels.com/photos/8834111/pexels-photo-8834111.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  colour1: 'https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cut2: 'https://images.pexels.com/photos/8834079/pexels-photo-8834079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  durbanBeach: 'https://images.pexels.com/photos/14169042/pexels-photo-14169042.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  durbanPier: 'https://images.pexels.com/photos/31496976/pexels-photo-31496976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  facial1: 'https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  facial2: 'https://images.pexels.com/photos/7581072/pexels-photo-7581072.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  facial3: 'https://images.pexels.com/photos/36436447/pexels-photo-36436447.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  facial4: 'https://images.pexels.com/photos/12115040/pexels-photo-12115040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  facial5: 'https://images.pexels.com/photos/7581075/pexels-photo-7581075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  facial6: 'https://images.pexels.com/photos/4586708/pexels-photo-4586708.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  headSpa1: 'https://images.pexels.com/photos/36292486/pexels-photo-36292486.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  headSpa2: 'https://images.pexels.com/photos/20092123/pexels-photo-20092123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  clinicRoom: 'https://images.pexels.com/photos/11024139/pexels-photo-11024139.jpeg?auto=compress&cs=tinysrgb&h=800&w=1000',
  clinicRoom2: 'https://images.pexels.com/photos/10521230/pexels-photo-10521230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

/* ---------- Before / After sets ---------- */

function makeBA(prefix: string): Transformation[] {
  const base: Omit<Transformation, 'id'>[] = [
    {
      title: 'Full Head Balayage',
      beforeImg: 'https://images.pexels.com/photos/11428513/pexels-photo-11428513.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      afterImg: 'https://images.pexels.com/photos/20781291/pexels-photo-20781291.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      description: 'Seamless sun-kissed balayage with a soft root blend and toner for a luminous finish.',
      category: 'Balayage',
    },
    {
      title: 'Mycro Keratin Treatment',
      beforeImg: 'https://images.pexels.com/photos/6923240/pexels-photo-6923240.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      afterImg: 'https://images.pexels.com/photos/10961652/pexels-photo-10961652.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      description: 'Frizz-free, glass-smooth hair after a 2-hour Mycro Keratin smoothing treatment.',
      category: 'Treatments',
    },
    {
      title: 'Premium Weave Install',
      beforeImg: 'https://images.pexels.com/photos/14730877/pexels-photo-14730877.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      afterImg: 'https://images.pexels.com/photos/29824660/pexels-photo-29824660.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      description: 'Full sew-in weave with seamless blending and a flawless flat-iron finish.',
      category: 'Extensions',
    },
    {
      title: 'Wash & Blow Wave Styling',
      beforeImg: 'https://images.pexels.com/photos/16354624/pexels-photo-16354624.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      afterImg: 'https://images.pexels.com/photos/36784894/pexels-photo-36784894.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      description: 'Bouncy, voluminous blow wave after a deep repair mask and creative styling.',
      category: 'Styling',
    },
    {
      title: 'Half Head Foils + Toner',
      beforeImg: 'https://images.pexels.com/photos/8468036/pexels-photo-8468036.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      afterImg: 'https://images.pexels.com/photos/20781288/pexels-photo-20781288.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      description: 'Brightening half-head foils with a cool toner to refresh and brighten the face.',
      category: 'Balayage',
    },
    {
      title: 'Japanese Silk Treatment',
      beforeImg: 'https://images.pexels.com/photos/14730864/pexels-photo-14730864.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      afterImg: 'https://images.pexels.com/photos/14730875/pexels-photo-14730875.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
      description: 'Silky, mirror-shine finish after a Japanese Silk smoothing treatment.',
      category: 'Treatments',
    },
  ];
  return base.map((b, i) => ({ ...b, id: `${prefix}-ba-${i}` }));
}

const rivoniaBeforeAfter: Transformation[] = [
  {
    id: 'riv-ba-1',
    title: 'Rivonia Junction Hair Transformation',
    beforeImg: '/assets/branches/acrylic_game_rivonia_junction/Screenshot_20260922_023054_Instagram.jpg',
    afterImg: '/assets/branches/acrylic_game_rivonia_junction/Screenshot_20260922_023102_Instagram.jpg',
    description: 'A beautiful Rivonia Junction hair transformation.',
    category: 'Treatments',
  },
  {
    id: 'riv-ba-2',
    title: 'Rivonia Junction Hair Transformation',
    beforeImg: '/assets/branches/acrylic_game_rivonia_junction/Screenshot_20260922_022725_Instagram.jpg',
    afterImg: '/assets/branches/acrylic_game_rivonia_junction/Screenshot_20260922_022732_Instagram.jpg',
    description: 'A polished Rivonia Junction styling transformation.',
    category: 'Styling',
  },
];

/* ---------- Pricing ---------- */

const rivoniaPricing: ServiceCategory[] = [
  {
    id: 'mens-cuts',
    label: "Men's Hair Cuts",
    items: [
      { name: "Men's Cut", description: 'Blending & fading techniques', price: 'R300' },
      { name: "Men's Full Head Colour", description: 'From', price: 'R500' },
      { name: "Men's Full Head Tinting, Toner + Cut", description: 'From', price: 'R1100' },
      { name: 'Younger Boy Cut (1–12 yrs)', price: 'R200' },
      { name: 'Note', description: 'No beard work included', price: '—' },
    ],
  },
  {
    id: 'nails-pedi',
    label: 'Nails & Pedicures',
    items: [
      { name: 'Express Pedi / Mani', description: 'Soak, dead skin removal, exfoliate, cuticle work, file & buff', price: 'R200' },
      { name: 'Express Pedi + Gel Toes Combo', price: 'R340' },
      { name: 'Medi Pedi', description: 'Medicated heel peel, dead skin removal, neutraliser, exfoliate, massage, skin seal wax, cuticle work, file & buff', price: 'R350' },
      { name: 'Caviar / Jelly Pedi', description: 'Dense jelly texture, exfoliation, cuticle work, file & buff, 10 min foot massage', price: 'R350' },
      { name: 'Top up Gelish Toes', price: 'R150' },
    ],
  },
  {
    id: 'acrylic-nails',
    label: 'Acrylic Nails',
    items: [
      { name: 'Acrylic Colour Overlay', price: 'R300' },
      { name: 'Short Square Tips', price: 'R300' },
      { name: 'Medium Square Tips', price: 'R320' },
      { name: 'Tips (Long / Coffin / Almond)', price: 'R380' },
      { name: 'Ombré Short – Medium Tips', price: 'R340' },
      { name: 'Ombré (Long / Coffin / Almond)', price: 'R400' },
      { name: 'Extra Length Top-Up', price: 'R50' },
    ],
  },
  {
    id: 'gelish-gel-tips',
    label: 'Gelish & Gel Tips',
    items: [
      { name: 'Gelish Colour Overlay', price: 'R280' },
      { name: 'Gelish French Overlay', price: 'R320' },
      { name: 'Gelish Colour Overlay — Feet', price: 'R220' },
      { name: 'Gelish French Overlay — Feet', price: 'R260' },
      { name: 'Add Rubber Base', price: 'R70' },
      { name: 'Gel Tips / Soft Gel Tips — Short', price: 'R300' },
      { name: 'Gel Tips / Soft Gel Tips — Medium', price: 'R320' },
      { name: 'Gel Tips / Soft Gel Tips — Long', price: 'R380' },
      { name: 'Gel Tips / Soft Gel Tips — Extra Length', price: '+R50' },
    ],
  },
  {
    id: 'nail-extras',
    label: 'Nail Extras & Removal',
    items: [
      { name: 'Nail Art (per nail)', price: 'R10' },
      { name: 'Foil / Stickers (per nail)', price: 'R10' },
      { name: 'Free Hand Art (per nail)', price: 'R20' },
      { name: 'French Gel Art (per nail)', price: 'R10' },
      { name: 'Soak Off ONLY', price: 'R80' },
      { name: 'Soak Off with New Set', price: 'R60' },
      { name: 'Nail Repairs', price: 'R30' },
    ],
  },
  {
    id: 'foils-balayage',
    label: 'Hair Foils & Balayage',
    items: [
      { name: 'Foils — Full Head', description: 'From', price: 'R1300' },
      { name: 'Foils — Half Head', description: 'From', price: 'R1000' },
      { name: 'Foils — Hairline / T-Zone', description: 'From', price: 'R750' },
      { name: 'Balayage — Full Head + Toner', description: 'From', price: 'R2000' },
      { name: 'Balayage + Toner + Root Blend', description: 'From', price: 'R2500' },
    ],
  },
  {
    id: 'colour-retouch',
    label: 'Hair Colour & Root Retouch',
    items: [
      { name: 'Root Retouch — Full Head', price: 'R750' },
      { name: 'Root Retouch — 1/2 Head', price: 'R600' },
      { name: 'Root Retouch — T-Zone', price: 'R450' },
      { name: 'Full Head Colour — Short', description: 'From', price: 'R900' },
      { name: 'Full Head Colour — Medium', description: 'From', price: 'R1100' },
      { name: 'Full Head Colour — Long', description: 'From', price: 'R1400' },
    ],
  },
  {
    id: 'drybar',
    label: 'Hair Dry Bar',
    items: [
      { name: 'Wash, Cut + Blow Wave', price: 'R450' },
      { name: 'Wash + Blow Wave', price: 'R250' },
      { name: 'Creative Wash & Blow Wave', description: 'Rollers, extra volume, hair iron, brush curl', price: 'R350' },
      { name: 'Toner Extra', description: 'From', price: 'R700' },
      { name: 'Root Blend Extra', description: 'From', price: 'R800' },
      { name: 'Wellaplex Treatment', price: 'R550' },
    ],
  },
  {
    id: 'treatments-keratin',
    label: 'Hair Treatments & Keratin',
    items: [
      { name: 'Deep Repair Mask', price: 'R200' },
      { name: 'Total Treat Mask', price: 'R150' },
      { name: 'Keratin Extreme Capsule', price: 'R250' },
      { name: 'Intense Post Colour Treatment', price: 'R400' },
      { name: 'Mycro Keratin — Short', description: 'From', price: 'R1200' },
      { name: 'Mycro Keratin — Medium', description: 'From', price: 'R1400' },
      { name: 'Mycro Keratin — Long', description: 'From', price: 'R1800' },
      { name: 'Japanese Silk — Short 15ml', price: 'R750' },
      { name: 'Japanese Silk — Medium 30ml', price: 'R900' },
      { name: 'Japanese Silk — Long 50ml', price: 'R1200' },
      { name: 'Japanese Silk — Extra Long 75ml', price: 'R1350' },
      { name: 'Japanese Silk — Extra per 5ml', price: 'R150' },
    ],
  },
  {
    id: 'extra-length-topups',
    label: 'Hair Extra Length Top-Ups',
    items: [
      { name: 'Full Head Colour / Toner Top-Up — 1/2 Tube', price: 'R400' },
      { name: 'Full Head Colour / Toner Top-Up — 1 Tube', price: 'R550' },
      { name: 'Full Head Colour / Toner Top-Up — 1 1/2 Tube', price: 'R700' },
      { name: 'Balayage / Highlights Extra Length Top-Up', price: 'R650' },
    ],
  },
];

const consultationPricing: ServiceCategory[] = [
  {
    id: 'drybar',
    label: 'Hair Dry Bar',
    items: [
      { name: 'Wash, Cut + Blow wave', price: 'By consultation' },
      { name: 'Wash + Blow wave', price: 'By consultation' },
      { name: 'Creative Wash & Blow wave', price: 'By consultation' },
      { name: 'Toner', description: 'From', price: 'By consultation' },
      { name: 'Wellaplex Treatment', price: 'By consultation' },
    ],
  },
  {
    id: 'colour',
    label: 'Root Retouch & Full Head Colour',
    items: [
      { name: 'Root Retouch', description: 'Full / Half / T-Zone', price: 'By consultation' },
      { name: 'Full Head Colour', description: 'Short / Medium / Long', price: 'By consultation' },
    ],
  },
  {
    id: 'foils',
    label: 'Foils, Highlights & Balayage',
    items: [
      { name: 'Foils / Highlights', description: 'Full / Half / Hairline', price: 'By consultation' },
      { name: 'Balayage', description: 'Full head + toner options', price: 'By consultation' },
    ],
  },
  {
    id: 'treatment-bar',
    label: 'Hair Treatment Bar',
    items: [
      { name: 'Deep Repair Mask', price: 'By consultation' },
      { name: 'Total Treat Mask', price: 'By consultation' },
      { name: 'Keratin Extreme Capsule', price: 'By consultation' },
      { name: 'Intense Post Colour Treatment', price: 'By consultation' },
    ],
  },
  {
    id: 'japanese-mycro',
    label: 'Japanese Silk & Mycro Keratin',
    items: [
      { name: 'Japanese Silk Treatment', description: 'Short / Medium / Long / Extra Long', price: 'By consultation' },
      { name: 'Mycro Keratin', description: 'Short / Medium / Long (1-2 hrs)', price: 'By consultation' },
    ],
  },
  {
    id: 'wig-weave-natural',
    label: 'Wig, Weave & Natural Hair',
    items: [
      { name: 'Sew-In options', description: 'Wash + styling add-ons', price: 'By consultation' },
      { name: 'Wig Wash / Treatment', price: 'By consultation' },
      { name: 'Natural Hair services', price: 'By consultation' },
      { name: 'Add-Ons', description: 'Flat iron, curls, hydration', price: 'By consultation' },
    ],
  },
];

const rivoniaSpecials: Special[] = [
  { id: 'rv-sp1', title: 'Spring Hair Glow-Up', description: 'Full head balayage + toner + deep repair mask. Limited spring slots available.', badge: 'Spring Special', originalPrice: 'R2750', salePrice: 'R2200' },
  { id: 'rv-sp2', title: 'Mycro Keratin Bundle', description: 'Mycro Keratin medium length plus a complimentary Keratin Extreme Capsule.', badge: 'Save R250', originalPrice: 'R1650', salePrice: 'R1400' },
  { id: 'rv-sp3', title: 'First Visit Blow Wave', description: 'New clients enjoy a creative wash & blow wave at a special intro rate.', badge: 'New Client', originalPrice: 'R350', salePrice: 'R280' },
];

const sunninghillPricing: ServiceCategory[] = [
  {
    id: 'sh-acrylic-nails',
    label: 'Acrylic Nails',
    items: [
      { name: 'Acrylic Colour Overlay', price: 'R300' },
      { name: 'Short Square Tips', price: 'R280' },
      { name: 'Medium Square Tips', price: 'R300' },
      { name: 'Tips (Long / Coffin / Almond)', price: 'R350' },
      { name: 'Ombré Short – Med Tips', price: 'R320' },
      { name: 'Ombré (Long / Coffin / Almond)', price: 'R360' },
      { name: 'Extra Length', price: 'R50' },
    ],
  },
  {
    id: 'sh-gelish',
    label: 'Gelish Nails',
    items: [
      { name: 'Gelish Colour Overlay', price: 'R220' },
      { name: 'Gelish French Overlay', price: 'R280' },
      { name: 'Gelish Colour Overlay — Feet', price: 'R170' },
      { name: 'Gelish French Overlay — Feet', price: 'R220' },
      { name: 'Add: Rubber Base', price: 'R80' },
      { name: 'Structure Gel Overlays', price: 'R320' },
      { name: 'Rubber Base Gel Overlays', description: 'In rubber base colours', price: 'R250' },
    ],
  },
  {
    id: 'sh-gel-tips',
    label: 'Gel Tips / Soft Gel Tips',
    items: [
      { name: 'Short', price: 'R280' },
      { name: 'Medium', price: 'R300' },
      { name: 'Long', price: 'R340' },
      { name: 'Extra Length', price: 'R50' },
    ],
  },
  {
    id: 'sh-structure-acrylic',
    label: 'Structure Acrylic (Nail Forms)',
    items: [
      { name: 'Short', price: 'R330' },
      { name: 'Medium', price: 'R360' },
      { name: 'Long', price: 'R400' },
    ],
  },
  {
    id: 'sh-nail-extras',
    label: 'Nail Extras',
    items: [
      { name: 'Foil / Stickers / Chrome', price: 'R10' },
      { name: 'Gel French (per nail)', price: 'R10' },
      { name: '3D Art', description: 'From', price: 'R30' },
      { name: 'Advanced Nail Art', description: 'From', price: 'R30' },
      { name: 'Gel Ombré (per nail)', price: 'R20' },
      { name: 'Nail Repairs', price: 'R30' },
      { name: 'Soak Off ONLY', price: 'R80' },
      { name: 'Soak Off with New Set', price: 'R60' },
    ],
  },
  {
    id: 'sh-pedi-mani',
    label: 'Pedicures & Manicures',
    items: [
      { name: 'Express Pedicure OR Manicure', description: 'Soak, dead skin removal, exfoliate, cuticle work, file & buff', price: 'R200' },
      { name: 'Express Pedi + Gel Toes Combo', price: 'R300' },
      { name: 'Delux Pedi', description: 'Soak, dead skin removal, exfoliate, hydrating mask, massage, heel seal wax, cuticle work, file & buff', price: 'R260' },
      { name: 'Medi Pedi', description: 'Medicated heel peel, dead skin removal, neutraliser, exfoliate, massage, skin seal wax, cuticle work, file & buff', price: 'R300' },
      { name: 'Caviar / Jelly Pedi', price: 'R220' },
    ],
  },
  {
    id: 'sh-waxing',
    label: 'Waxing',
    items: [
      { name: 'Upper / Lower Lip / Nose', price: 'R80' },
      { name: 'Chin / Side Burns', price: 'R90' },
      { name: 'Eyebrows', price: 'R100' },
      { name: 'Underarm', price: 'R90' },
      { name: 'Chest', price: 'R150' },
      { name: '1/2 Arm', price: 'R150' },
      { name: 'Tummy', price: 'R150' },
      { name: 'Full Arm', price: 'R180' },
      { name: '1/2 Leg', price: 'R190' },
      { name: '3/4 Leg', price: 'R210' },
      { name: 'Full Leg', price: 'R230' },
      { name: 'Full Back', price: 'R230' },
      { name: 'Eyebrows + Henna Tint', price: 'R220' },
      { name: 'Full Face Wax', price: 'R220' },
      { name: 'Brazilian (Front)', price: 'R200' },
      { name: 'Hollywood (Back + Front)', price: 'R250' },
      { name: 'Full Body', price: 'R1 000' },
    ],
  },
  {
    id: 'sh-laser',
    label: 'Laser Hair Removal',
    items: [
      { name: 'Unibrow / Nose', description: 'Each', price: 'R100' },
      { name: 'Ears', price: 'R120' },
      { name: 'Upperlip', price: 'R150' },
      { name: 'Chin / Cheeks / Forehead', description: 'Each', price: 'R200' },
      { name: 'Nape of Neck', price: 'R210' },
      { name: 'Jawline', price: 'R230' },
      { name: 'Side Burns', price: 'R250' },
      { name: 'Neck', price: 'R280' },
      { name: 'Half Face', description: 'Forehead, upper/lower lip, chin', price: 'R300' },
      { name: 'Full Face', price: 'R500' },
      { name: 'Face & Neck', price: 'R700' },
      { name: 'Belly Line / Chest Line / Knees', description: 'Each', price: 'R200' },
      { name: 'Nipples', price: 'R250' },
      { name: 'Underarms', price: 'R280' },
      { name: 'Bikini (Panty Line)', price: 'R350' },
      { name: 'Lower Back / Breasts / Stomach / Shoulders', description: 'Each', price: 'R400' },
      { name: 'Half Back / Buttocks / Half Arms', description: 'Each', price: 'R500' },
      { name: 'Brazilian (Full Front)', price: 'R500' },
      { name: 'Chest / Thighs / Hollywood (Full Front & Back)', description: 'Each', price: 'R600' },
      { name: 'Half Legs', description: 'Knees to toes', price: 'R650' },
      { name: 'Full Back / Full Arms', description: 'Each', price: 'R750' },
      { name: 'Full Legs', description: 'Hip to toes', price: 'R1 200' },
    ],
  },
  {
    id: 'sh-isclinical',
    label: 'iS Clinical Facials',
    items: [
      { name: 'Fire and Ice Facial', price: 'R1 100' },
      { name: 'Honey Enzyme Facial', price: 'R1 100' },
      { name: 'Champagne Facial', price: 'R1 300' },
    ],
  },
  {
    id: 'sh-body-treatments',
    label: 'Specialised Body Treatments',
    items: [
      { name: 'Vagacial', description: 'Cleanse, tone, 15min steam, exfoliate, blackhead removal, 10min lightening mask, stem cell elixir, moisturise', price: 'R250' },
      { name: 'Vagacial + Hollywood Wax', description: 'Add-on', price: '+R180' },
      { name: 'Deep Exfoliating Back Cleanse', description: 'Cleanse, 15min steam, exfoliate, deep pore cleansing, hydrojelly mask, intense repair serum, moisturiser + massage', price: 'R300' },
    ],
  },
  {
    id: 'sh-skin-tag',
    label: 'Skin Tag Removal',
    items: [
      { name: '20 Min Session', description: 'No numbing', price: 'R600' },
      { name: '40 Min Session', description: '20min numbing', price: 'R900' },
      { name: '60 Min Session', description: '35min numbing', price: 'R1 100' },
    ],
  },
  {
    id: 'sh-permanent-makeup',
    label: 'Permanent Make Up',
    items: [
      { name: 'Powder Brow (1 Session)', price: 'R1 850' },
      { name: 'Powder Brow (2 Sessions)', price: 'R3 500' },
      { name: 'Lip Neutralisation (1 Session)', price: 'R1 650' },
      { name: 'Lip Neutralisation (2 Sessions)', price: 'R3 000' },
    ],
  },
];

const sunninghillSpecials: Special[] = [
  { id: 'sh-sp1', title: 'iS Clinical Fire and Ice Facial', description: 'September special — intensive resurfacing facial for brighter, smoother skin.', badge: 'September Special', originalPrice: 'R1 100', salePrice: 'R900' },
  { id: 'sh-sp2', title: 'Standard Microneedling + Dermaplaning', description: 'Combined collagen induction and dermaplaning for smoother texture and tone.', badge: 'September Special', originalPrice: 'R1 400', salePrice: 'R1 100' },
  { id: 'sh-sp3', title: 'pH Formula Exosomes Microneedling', description: 'Advanced exosomes with microneedling for skin regeneration and repair.', badge: 'September Special', originalPrice: 'R2 200', salePrice: 'R1 800' },
  { id: 'sh-sp4', title: 'Luxury Nanoneedling + Dermaplaning', description: 'Gentle nanoneedling paired with dermaplaning for a radiant glow.', badge: 'September Special', originalPrice: 'R1 000', salePrice: 'R800' },
  { id: 'sh-sp5', title: 'pH Formula Under Eye Treatment', description: 'Targeted treatment for dark circles and hollow eyes.', badge: 'September Special', originalPrice: 'R1 500', salePrice: 'R1 300' },
  { id: 'sh-sp6', title: 'Fat Dissolving Injections — 20x', description: 'Lemonbottle lipolysis injections for targeted fat reduction.', badge: 'September Special', originalPrice: 'R1 800', salePrice: 'R1 500' },
  { id: 'sh-sp7', title: 'Fat Dissolving Injections — 60x', description: 'Extended fat dissolving package for larger or multiple areas.', badge: 'September Special', originalPrice: 'R5 000', salePrice: 'R4 500' },
  { id: 'sh-sp8', title: '10% OFF pH Formula Customised Treatment', description: 'Acne, pigmentation, uneven tone, texture, clearer skin — includes AI skin analysis.', badge: 'September Special', originalPrice: 'R1 450', salePrice: 'R1 305' },
];

const parkhurstPricing: ServiceCategory[] = [
  {
    id: 'pk-head-spa',
    label: 'Korean Head Spa',
    items: [
      {
        name: 'Standard Korean Head Spa',
        description: 'HD camera scalp analysis, clarifying & detox scalp cleanse, radio frequency therapy, electric scalp massage, lymphatic neck & shoulder massage, power blow dry and brush.',
        price: 'R850',
      },
      { name: 'Add-on: Hydra-suction', description: 'Unclogs hair follicles', price: 'R150' },
      { name: 'Add-on: Keratin Based Treatment', price: 'R200' },
      { name: 'Add-on: Styling', description: 'Straight blow wave or brush curls', price: 'R200' },
    ],
  },
  {
    id: 'pk-hydrafacial',
    label: 'Hydrafacial',
    items: [
      {
        name: 'Standard Hydra Facial',
        description: 'Non-invasive skin resurfacing: cleansing, exfoliation, extraction, hydration. Includes hydra-suction, extractions, radio frequency, cold press, leave-in nanovitamin mask.',
        price: 'R600',
      },
      { name: 'Standard Hydra Facial + Dermaplaning', price: 'R800' },
      { name: 'Micro-needling + Hydra-facial', price: 'R1 100' },
      { name: 'Nano-needling + Hydra-facial', price: 'R950' },
      { name: 'Add-on: Dermaplaning', price: 'R150' },
    ],
  },
  {
    id: 'pk-waxing',
    label: 'Waxing',
    items: [
      { name: 'Upper-Lip / Lower-Lip / Nose', price: 'R80' },
      { name: 'Chin / Side Burns', price: 'R90' },
      { name: 'Underarms', price: 'R100' },
      { name: 'Chest', price: 'R100' },
      { name: 'Tummy', price: 'R120' },
      { name: '1/2 Arm', price: 'R200' },
      { name: 'Full Arm', price: 'R250' },
      { name: '1/2 Leg', price: 'R220' },
      { name: '3/4 Leg', price: 'R240' },
      { name: 'Full Leg', price: 'R280' },
      { name: 'Full Back', price: 'R280' },
      { name: 'Brazilian (Front)', price: 'R200' },
      { name: 'Hollywood (Back + Front)', price: 'R280' },
    ],
  },
  {
    id: 'pk-laser',
    label: 'Laser Hair Removal',
    items: [
      { name: 'Unibrow / Nose', price: 'R100' },
      { name: 'Ears', price: 'R120' },
      { name: 'Forehead', price: 'R130' },
      { name: 'Upper-Lip', price: 'R150' },
      { name: 'Chin / Cheeks', price: 'R200' },
      { name: 'Nape of Neck', price: 'R210' },
      { name: 'Jaw Line', price: 'R230' },
      { name: 'Side Burns', price: 'R250' },
      { name: 'Neck', price: 'R280' },
      { name: 'Half Face', description: 'Forehead, upper/lower lip, chin', price: 'R300' },
      { name: 'Full Face', price: 'R500' },
      { name: 'Full Face + Neck', price: 'R700' },
      { name: 'Breast', price: 'R180' },
      { name: 'Belly Line / Chest Line / Knees', price: 'R200' },
      { name: 'Chest', price: 'R250' },
      { name: 'Underarms', price: 'R280' },
      { name: 'Shoulders', price: 'R350' },
      { name: 'Bikini (Panty Line)', price: 'R370' },
      { name: 'Lower Back', price: 'R450' },
      { name: 'Half Back / Half Arms / Buttocks / Brazilian (Full Front)', price: 'R500' },
      { name: 'Half Leg', description: 'Knees to toes', price: 'R700' },
      { name: 'Hollywood (Front + Back)', price: 'R700' },
      { name: 'Stomach', price: 'R750' },
      { name: 'Full Arms', price: 'R800' },
      { name: 'Full Back', price: 'R900' },
      { name: 'Full Leg', description: 'Hips to toes', price: 'R1 200' },
    ],
  },
  {
    id: 'pk-slimming',
    label: 'Slimming',
    items: [
      { name: 'Laser Lipo (30 Minutes)', description: 'Non-invasive body contouring using low-level laser energy', price: 'R500' },
      { name: 'Cavitation (30 Minutes)', description: 'Ultrasonic cavitation — non-surgical fat dissolving using heat treatment to contour and shape the body', price: 'R500' },
      { name: 'Laser Lipo + Cavitation', price: 'R850' },
      { name: 'Laser Lipo + 10 Injections', price: 'R1 300' },
      { name: 'Lipo-Lab Fat Dissolving — 10 Injections', description: 'Single area: double chin, arms, tummy, thighs', price: 'R900' },
      { name: 'Lipo-Lab Fat Dissolving — 30 Injections', description: 'Targets 2–3 areas', price: 'R2 400' },
    ],
  },
  {
    id: 'pk-pedicures',
    label: 'Pedicures',
    items: [
      { name: 'Express Pedi', description: 'Foot file, cuticle work, foot massage, file & buff on nails', price: 'R200' },
      { name: 'Russian Pedi', description: 'Foot soak, dead skin removal, foot exfoliation, cuticle work, file & buff on nails', price: 'R280' },
      { name: 'Russian Pedi + Gel Toes Combo', price: 'R400' },
      { name: 'Deluxe Pedi', description: 'Milk soak, dead skin removal, foot exfoliation, hydrating mask, massage, heel seal wax, cuticle work, file & buff on nails', price: 'R350' },
      { name: 'Deluxe Pedi + Gel Toes', description: 'Add-on', price: '+R150' },
      { name: 'Medi Pedi', description: 'Ultimate relief for dry/cracked feet — medicated heel peel, dead skin removal, foot exfoliation, massage, heel seal wax, cuticle work, file & buff on nails', price: 'R410' },
      { name: 'Medi Pedi + Gel Toes', description: 'Add-on', price: '+R150' },
      { name: 'Gel Toes', price: 'R220' },
      { name: 'Add-on: French', price: 'R100' },
      { name: 'Add-on: Rubber Base', price: 'R80' },
      { name: 'Soak Off', price: 'R60' },
    ],
  },
  {
    id: 'pk-mani-nails',
    label: 'Manicures & Nails',
    items: [
      { name: 'Manicure', description: 'Hand scrub, extensive cuticle work, file & buff, hand massage', price: 'R280' },
      { name: 'Manicure + Gel Toes Combo', price: 'R400' },
      { name: 'Kiddies Mani / Pedi', description: 'Soak, file & buff, nail polish on request, hand massage', price: 'R100' },
      { name: 'Kiddies Mani + Pedi Combo', price: 'R180' },
      { name: 'Gel Overlay (Natural Nails)', description: 'Standard gel', price: 'R280' },
      { name: 'Structured Gel Overlay', price: 'R350' },
      { name: 'Polygel Overlay', price: 'R350' },
      { name: 'Soft Gel Tips', price: 'R380' },
      { name: 'Structured Gel Tips', price: 'R400' },
      { name: 'Polygel Tips', price: 'R350' },
      { name: 'Acrylic Overlay', price: 'R300' },
      { name: 'Acrylic Tips (Short – Med)', price: 'R330' },
      { name: 'Extra Length', price: 'R50' },
      { name: 'French / Ombré (per nail)', price: 'R10' },
      { name: 'Chrome / Stones (per nail)', price: 'R10' },
      { name: 'Cat Eye / Glitter (per nail)', price: 'R15' },
      { name: 'Advanced Free Hand (per nail)', price: 'R20' },
      { name: 'Rubber Base', price: 'R80' },
      { name: 'Soak Off', price: 'R60' },
    ],
  },
];

const parkhurstSpecials: Special[] = [
  { id: 'pk-sp1', title: 'Korean Head Spa Intro', description: 'Experience our signature Korean Head Spa with HD scalp analysis and RF therapy.', badge: 'Signature', originalPrice: 'R1 000', salePrice: 'R850' },
  { id: 'pk-sp2', title: 'Hydrafacial + Dermaplaning Combo', description: 'Deep skin resurfacing combined with dermaplaning for a radiant glow.', badge: 'Combo Save', originalPrice: 'R900', salePrice: 'R800' },
  { id: 'pk-sp3', title: 'Laser Lipo + Cavitation', description: 'Non-surgical body contouring — combine both treatments for enhanced results.', badge: 'Body Special', originalPrice: 'R1 000', salePrice: 'R850' },
];

const durbanPricing: ServiceCategory[] = [
  {
    id: 'db-nails',
    label: 'Nails',
    items: [
      { name: 'Acrylic Square Tips — Short', price: 'R250' },
      { name: 'Acrylic Square Tips — Medium', price: 'R270' },
      { name: 'Acrylic Tips (Long / Shapes)', price: 'R300' },
      { name: 'Acrylic Colour Overlays', price: 'R270' },
      { name: 'Acrylic Repair (per nail)', price: 'R20' },
      { name: 'Acrylic Feet (Sculpt)', price: 'R200' },
      { name: 'Ombré Square Tips (S/M)', price: 'R280' },
      { name: 'Ombré Tips (Long / Shapes)', price: 'R310' },
      { name: 'Ombré Overlays', price: 'R280' },
      { name: 'Extra Length Tips', price: 'R50' },
      { name: 'Gelish Colour Overlay', price: 'R180' },
      { name: 'Gelish French Overlay', price: 'R240' },
      { name: 'Gelish Toes', price: 'R150' },
      { name: 'Gelish French Toes', price: 'R200' },
      { name: 'Add: Rubber Base', price: 'R50' },
      { name: 'Full Cover Tips — Short Square', price: 'R250' },
      { name: 'Full Cover Tips — Medium Square', price: 'R270' },
      { name: 'Full Cover Tips — Coffin Medium', price: 'R300' },
      { name: 'Full Cover Tips — Almond Medium', price: 'R300' },
      { name: 'Crystals / Rhinestones (each)', price: 'R1' },
      { name: 'Foil Art (per nail)', price: 'R10' },
      { name: 'Sticker Art (per nail)', price: 'R10' },
      { name: 'French Gel Art (per nail)', price: 'R10' },
      { name: 'Free Hand Gel Art (per nail)', price: 'R20' },
      { name: 'Soak Offs', price: 'R80' },
      { name: 'Soak Off with New Set', price: 'R60' },
    ],
  },
  {
    id: 'db-waxing',
    label: 'Waxing / Threading',
    items: [
      { name: 'Upper / Lower Lip / Nose', price: 'R50' },
      { name: 'Chin / Side Burns', price: 'R60' },
      { name: 'Eyebrows', price: 'R70' },
      { name: 'Eyebrow + Henna Tint', price: 'R200' },
      { name: 'Brow Wax + Normal Tint', price: 'R130' },
      { name: 'Full Face (Wax)', price: 'R190' },
      { name: 'Full Face (Thread)', price: 'R180' },
      { name: 'Underarms', price: 'R70' },
      { name: 'Full Arm', price: 'R140' },
      { name: 'Chest', price: 'R100' },
      { name: 'Tummy', price: 'R100' },
      { name: 'Full Leg', price: 'R190' },
      { name: '1/2 Leg', price: 'R140' },
      { name: '3/4 Leg', price: 'R170' },
      { name: 'Brazilian', price: 'R180' },
      { name: 'Full Back', price: 'R180' },
      { name: 'Hollywood (Back & Front)', price: 'R200' },
      { name: 'Full Body', price: 'R700' },
      { name: 'Combo: Full Leg & Hollywood', price: 'R380' },
    ],
  },
  {
    id: 'db-pedi-mani',
    label: 'Pedicures & Manicures',
    items: [
      { name: 'Express Pedicure OR Manicure', description: 'Soak, dead skin removal, exfoliate, cuticle work, file & buff of nails', price: 'R200' },
      { name: 'Express Pedi + Gel Toes Combo', price: 'R300' },
      { name: 'Deluxe Pedi', description: 'Soak, dead skin removal, exfoliate, hydrating mask, massage, heel seal wax, cuticle work, file & buff of nails', price: 'R240' },
      { name: 'Medi Pedi', description: 'Ultimate relief for dry/cracked feet — medicated heel peel, dead skin removal, neutraliser, exfoliate, massage, skin seal wax, cuticle work, file & buff of nails', price: 'R270' },
      { name: 'Caviar / Jelly Pedi', description: 'Ultimate relief for stressed & aching muscles — dense jelly texture massages & gently exfoliates & softens cracked skin', price: 'R220' },
    ],
  },
  {
    id: 'db-specialised',
    label: 'Specialised Treatments',
    items: [
      { name: 'Vagacial', description: 'Treats ingrown hairs, removes dead skin cells, smoothes bumps, prevents acne. Cleanse, tone, 15min steaming, exfoliate, blackhead removal, 10min lightening mask, stem cell elixir serum, moisturise.', price: 'R250' },
      { name: 'Vagacial + Hollywood Wax', description: 'Add-on', price: '+R180' },
      { name: 'Deep Exfoliating Back Cleanse', description: 'Removes dead skin, evens tone, reduces ingrown hairs & back acne. Cleanse, 15min steam, exfoliate, deep pore cleansing, hydrojelly mask, intense repair serum, moisturiser + massage.', price: 'R300' },
    ],
  },
  {
    id: 'db-lashes-brows',
    label: 'Lashes & Brows',
    items: [
      { name: 'Classic Lashes — Full Set', price: 'R500' },
      { name: 'Classic Lashes — 2 Week Fill', price: 'R300' },
      { name: 'Classic Lashes — 3 Week Fill', price: 'R330' },
      { name: 'Hybrid Lashes — Full Set', price: 'R650' },
      { name: 'Hybrid Lashes — 2 Week Fill', price: 'R350' },
      { name: 'Hybrid Lashes — 3 Week Fill', price: 'R380' },
      { name: 'Volume Lashes — Full Set', price: 'R750' },
      { name: 'Volume Lashes — 2 Week Fill', price: 'R400' },
      { name: 'Volume Lashes — 3 Week Fill', price: 'R430' },
      { name: 'Mega Volume Lashes — Full Set', price: 'R850' },
      { name: 'Mega Volume Lashes — 2 Week Fill', price: 'R450' },
      { name: 'Mega Volume Lashes — 3 Week Fill', price: 'R480' },
      { name: 'Lash Soak Off', price: 'R120' },
      { name: 'Lash Lift + Tint', price: 'R350' },
      { name: 'Brow Lamination', price: 'R350' },
    ],
  },
  {
    id: 'db-hydra-facials',
    label: 'Hydra Facials',
    items: [
      { name: 'Standard Hydra Facial', description: 'Non-invasive skin resurfacing — cleansing, exfoliation, extraction, hydration, antioxidant protection. Includes suction, radio frequency, cold press, leave-in nano vitamin mask.', price: 'R500' },
      { name: 'Hydra — Resurface', description: 'Standard hydra facial plus a chemical peel treatment (determined upon consult)', price: 'R750' },
      { name: 'Hydra — Plane', description: 'Dermaplaning to remove dead skin cells combined with hydra facial to deeply cleanse, exfoliate, hydrate, and protect', price: 'R700' },
      { name: 'Microneedling + Hydra Facial', price: 'R1 000' },
      { name: 'Nanoneedling + Hydra Facial', price: 'R900' },
    ],
  },
  {
    id: 'db-skincare-microneedling',
    label: 'Skincare & Microneedling',
    items: [
      { name: 'Standard Microneedling', description: 'Suitable for younger skins', price: 'R550' },
      { name: 'Advanced Microneedling', description: 'More powerful device — 2-3x more impactful results', price: 'R850' },
      { name: 'Add Dermaplan', description: 'Add-on to microneedling', price: '+R100' },
      { name: 'Nanoneedling — Standard Pen', description: 'Silicone bristles infuse serum with hyaluronic acid + argirelene. Zero discomfort, zero downtime.', price: 'R450' },
      { name: 'Nanoneedling — Advanced Pen', price: 'R700' },
      { name: 'Standard Dermaplan', description: 'Radio frequency extractions, vitamin mask', price: 'R500' },
      { name: 'Glow Treatment', description: 'Dermaplan, enzyme peel, vitamin mask', price: 'R550' },
      { name: 'Red Carpet', description: 'Dermaplan + nano needling, vitamin mask', price: 'R600' },
      { name: '40min Hydrating Facial + Mask', description: 'Targets dry / dehydrated / dull skin', price: 'R380' },
      { name: '30min Dermaplan + Express Facial', price: 'R500' },
      { name: 'Dermaplan ONLY', price: 'R400' },
      { name: 'Xpert Peel Facial', description: 'Targets acne prone skin, active acne, pigmentation, scarring', price: 'R450' },
      { name: 'Hyaluronic Peel', description: 'Superficial peel system — extreme hydration & glow for sensitive skin', price: 'R400' },
      { name: 'Luminescent Peel', description: 'Brightening peel — aids with pigmentation, discolouration, uneven complexion, lines & wrinkles', price: 'R400' },
    ],
  },
];

const durbanSpecials: Special[] = [
  { id: 'db-sp1', title: 'Mega Volume Lashes Full Set', description: 'Our most dramatic lash look — full volume mega set for maximum impact.', badge: 'Lash Special', originalPrice: 'R950', salePrice: 'R850' },
  { id: 'db-sp2', title: 'Hydra Facial + Microneedling', description: 'Deep skin resurfacing combined with collagen-inducing microneedling.', badge: 'Skin Combo', originalPrice: 'R1 200', salePrice: 'R1 000' },
  { id: 'db-sp3', title: 'Glow Treatment Special', description: 'Dermaplan, enzyme peel, and vitamin mask for an instant radiant glow.', badge: 'Glow Up', originalPrice: 'R650', salePrice: 'R550' },
];

const genericSpecials: Special[] = [
  { id: 'gn-sp1', title: 'Consultation Special', description: 'Book a free consultation this month and receive 10% off your first treatment.', badge: 'Limited Time', originalPrice: 'R150', salePrice: 'Free' },
  { id: 'gn-sp2', title: 'Treatment Tuesday', description: 'Every Tuesday — get a Deep Repair Mask free with any colour service.', badge: 'Tuesday Only', originalPrice: 'R200', salePrice: 'Free' },
];

/* ---------- Branches ---------- */

export const branches: Branch[] = [
  {
    id: 'rivonia',
    name: 'Rivonia Junction',
    area: 'Gauteng',
    address: 'Shop 12, Rivonia Junction, Cnr Rivonia Rd & 9th Street, Rivonia, Sandton',
    phone: '+27832354258',
    whatsappNumber: '27832354258',
    instagramHandle: '@acrylicgame_rivoniajunction',
    instagramUrl: 'https://www.instagram.com/acrylicgame_rivoniajunction?stkn=MXdwbmM5a29ldjZ4aQ==',
    logoUrl: '/assets/branches/acrylic_game_rivonia_junction/1000789874.png',
    logoTagline: 'HAIR • NAILS • BEAUTY',
    hours: 'Mon–Sat: 9:00–18:00 · Sun: 9:00–14:00',
    isFlagship: true,
    specials: rivoniaSpecials,
    pricing: rivoniaPricing,
    heroImage: img.interior6,
    salonGallery: [img.interior6, img.interior2, img.styling1, img.interior4, img.foil1, img.reception1],
    beforeAfterGallery: rivoniaBeforeAfter,
  },
  {
    id: 'sunninghill',
    name: 'Sunninghill',
    area: 'Gauteng',
    address: '5 Humber Street, Sunninghill, Sandton, Gauteng, 2191',
    phone: '+27 83 501 4723',
    whatsappNumber: '27835014723',
    instagramHandle: '@acrylic_game_sunninghill',
    instagramUrl: 'https://www.instagram.com/acrylic_game_sunninghill?stkn=ODViNWdhd29pem5t',
    logoUrl: '/assets/branches/acrylic_game_sunninghill/1000789872_(1).png',
    logoTagline: 'GIRL GANG',
    hours: 'Tuesday – Sunday',
    specials: sunninghillSpecials,
    pricing: sunninghillPricing,
    heroImage: img.facial1,
    salonGallery: [img.facial1, img.facial2, img.facial3, img.facial4, img.facial5, img.facial6],
    beforeAfterGallery: makeBA('sun'),
  },
  {
    id: 'parkhurst',
    name: 'The Aesthetic Loft',
    area: 'Parkhurst, Randburg',
    address: '75 12th Street, Parkhurst, Randburg',
    phone: '+27 68 196 2045',
    whatsappNumber: '27681962045',
    whatsappLink: 'https://wa.me/message/HUQ2ANXF27XHF1',
    instagramHandle: '@aestheticloftparkhurst',
    logoUrl: '/assets/branches/acrylic_game_parkhurst/1000789871.png',
    logoTagline: 'AESTHETIC LOFT',
    tiktokUrl: 'https://tiktok.com/@aestheticloftparkhurst',
    facebookPage: 'Aesthetic Loft',
    hours: 'By appointment · Tuesday – Sunday',
    specials: parkhurstSpecials,
    pricing: parkhurstPricing,
    heroImage: img.clinicRoom,
    salonGallery: [img.clinicRoom, img.headSpa1, img.clinicRoom2, img.facial1, img.headSpa2, img.facial2],
    beforeAfterGallery: makeBA('park'),
  },
  {
    id: 'midstream',
    name: 'Midstream',
    area: 'Gauteng',
    address: 'Midstream Commons, Cnr Dean & Riley Road, Midstream Estate, Centurion',
    phone: '+27 12 567 8901',
    whatsappNumber: '27125678901',
    instagramHandle: '@acrylicgame_midstream',
    hours: 'Mon–Sat: 9:00–18:00 · Sun: Closed',
    pricesByConsultation: true,
    specials: genericSpecials,
    pricing: consultationPricing,
    heroImage: img.interior4,
    salonGallery: [img.interior4, img.interior5, img.treatment1, img.interior3, img.iron1, img.cut2],
    beforeAfterGallery: makeBA('mid'),
  },
  {
    id: 'durban',
    name: 'Acrylic Game Durban',
    area: 'Windermere, Durban',
    address: '84 Innes Road, Windermere 4001',
    phone: '+27 73 442 8860',
    whatsappNumber: '27734428860',
    instagramHandle: '@acrylic_game_durban',
    instagramUrl: 'https://www.instagram.com/acrylic_game_durban?stkn=dnNzMmllbGk3N25k',
    logoUrl: '/assets/branches/acrylic_game_durban/1000789872.png',
    logoTagline: 'AESTHETICS • NAILS • WAXING • FACIALS',
    hours: 'Tuesday – Sunday',
    specials: durbanSpecials,
    pricing: durbanPricing,
    heroImage: img.durbanBeach,
    salonGallery: [img.durbanBeach, img.durbanPier, img.interior6, img.styling1, img.colour1, img.salonLondon],
    beforeAfterGallery: makeBA('dbn'),
  },
];

export function buildWhatsAppLink(branch: Branch): string {
  if (branch.whatsappLink) return branch.whatsappLink;
  const message = encodeURIComponent(
    `Hi ${branch.name}! I'd like to book an appointment. My preferred branch is ${branch.name} (${branch.area}).`
  );
  return `https://wa.me/${branch.whatsappNumber}?text=${message}`;
}

export function getBranchById(id: string): Branch {
  return branches.find((b) => b.id === id) ?? branches[0];
}
