import type { Service } from '@/data/locations';
import type { BookingServiceLine } from '@/types/booking';

export const MOBILE_BRANCH_ID = 'midstream-mobile';
export const BRANCH_STORAGE_KEY = 'acrylic-game-branch';

export type TimeWindowId = 'morning' | 'midday' | 'afternoon';

export const TIME_WINDOWS: { id: TimeWindowId; label: string; start: number; end: number }[] = [
  { id: 'morning', label: 'Morning', start: 9 * 60, end: 12 * 60 },
  { id: 'midday', label: 'Midday', start: 12 * 60, end: 15 * 60 },
  { id: 'afternoon', label: 'Afternoon', start: 15 * 60, end: 18 * 60 },
];

const CONSULTATION_CATEGORY_IDS = new Set([
  'sh-laser',
  'pk-laser',
  'laser',
  'sh-skin-tag',
  'skin-tag',
  'sh-permanent-makeup',
  'pk-slimming',
  'fat-dissolving',
]);

const CONSULTATION_NAME =
  /micro-?needl|nano-?needl|laser|inject|fat[\s-]*dissolv|skin[\s-]*tag|\bmole\b|permanent\s*make|lipo|lemonbottle|cauter/i;

export function isBookableService(item: Service): boolean {
  const name = item.name.trim().toLowerCase();
  const price = item.price.trim();
  if (name === 'note') return false;
  if (price === '—' || price === '-' || price === '–') return false;
  return true;
}

export function isFromPrice(item: Pick<Service, 'description' | 'price'>): boolean {
  const description = item.description?.trim() ?? '';
  return /^from\b/i.test(description) || /^from\b/i.test(item.price);
}

export function formatServicePrice(item: { description?: string; price: string; fromPrice?: boolean }): string {
  if (!(item.fromPrice || isFromPrice(item))) return item.price;
  const price = item.price.replace(/^from\s+/i, '').trim();
  if (/consultation/i.test(price)) return 'From · By consultation';
  return `From ${price}`;
}

export function serviceDetail(item: Pick<Service, 'description'>): string | undefined {
  const description = item.description?.trim();
  if (!description || /^from$/i.test(description)) return undefined;
  return description;
}

export function serviceNeedsConsultation(categoryId: string, name: string): boolean {
  return CONSULTATION_CATEGORY_IDS.has(categoryId) || CONSULTATION_NAME.test(name);
}

export function parseServiceAmount(price: string): number | null {
  if (/consultation|free/i.test(price)) return null;
  const match = price.replace(/\s/g, '').match(/(\d+(?:[.,]\d{1,2})?)/);
  if (!match) return null;
  const value = Number(match[1].replace(',', '.'));
  return Number.isFinite(value) ? value : null;
}

export function estimateSelection(items: { description?: string; price: string; fromPrice?: boolean }[]) {
  let amount = 0;
  let from = false;
  let unpriced = 0;
  for (const item of items) {
    if (item.fromPrice || isFromPrice(item)) from = true;
    const value = parseServiceAmount(item.price);
    if (value == null) unpriced += 1;
    else amount += value;
  }
  return { amount, from: from || unpriced > 0, unpriced };
}

export function formatRand(amount: number): string {
  return `R${new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(Math.round(amount))}`;
}

export function formatEstimate(estimate: { amount: number; from: boolean; unpriced: number }): string {
  if (estimate.amount <= 0 && estimate.unpriced > 0) return 'Confirmed at consultation';
  const value = formatRand(estimate.amount);
  return estimate.from ? `From ${value}` : value;
}

export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

export function formatLongDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isClosed(branchId: string, date: Date): boolean {
  const day = date.getDay();
  if (branchId === 'midstream') return day === 0;
  if (branchId === 'sunninghill' || branchId === 'parkhurst' || branchId === 'durban') return day === 1;
  return false;
}

export function closedDayMessage(branchId: string): string {
  switch (branchId) {
    case 'midstream':
      return 'Midstream is closed on Sundays.';
    case 'sunninghill':
      return 'Sunninghill is closed on Mondays.';
    case 'parkhurst':
      return 'The Aesthetic Loft is closed on Mondays. Appointments are Tuesday to Sunday.';
    case 'durban':
      return 'Durban is closed on Mondays.';
    default:
      return 'The salon is closed on that day.';
  }
}

export function closureSummary(branchId: string): string | null {
  switch (branchId) {
    case 'midstream':
      return 'Closed Sundays';
    case 'sunninghill':
      return 'Tuesday–Sunday · closed Mondays';
    case 'parkhurst':
      return 'By appointment · Tuesday–Sunday (closed Mondays)';
    case 'durban':
      return 'Tuesday–Sunday · closed Mondays';
    case 'rivonia':
      return 'Sunday hours 09:00–14:00';
    case MOBILE_BRANCH_ID:
      return 'By appointment · we visit you in Midstream';
    default:
      return null;
  }
}

/** Clock times are taken from branch hours where published. Other branches use 09:00–18:00. */
export function openingHours(branchId: string, date: Date): { open: string; close: string } | null {
  if (branchId === MOBILE_BRANCH_ID || isClosed(branchId, date)) return null;
  if (branchId === 'rivonia' && date.getDay() === 0) return { open: '09:00', close: '14:00' };
  return { open: '09:00', close: '18:00' };
}

export function hasPublishedClockHours(branchId: string): boolean {
  return branchId === 'rivonia' || branchId === 'midstream';
}

export function hoursNote(branchId: string): string {
  switch (branchId) {
    case 'rivonia':
      return 'Mon–Sat 09:00–18:00 · Sun 09:00–14:00';
    case 'midstream':
      return 'Mon–Sat 09:00–18:00 · closed Sundays';
    case 'parkhurst':
      return 'By appointment, Tuesday–Sunday. Slots shown for 09:00–18:00.';
    case 'sunninghill':
    case 'durban':
      return 'Tuesday–Sunday. Slots shown for 09:00–18:00; the salon confirms the exact time.';
    default:
      return 'The salon confirms the exact time.';
  }
}

function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function slotsForWindow(open: string, close: string, windowId: TimeWindowId): string[] {
  const window = TIME_WINDOWS.find((item) => item.id === windowId);
  if (!window) return [];
  const start = Math.max(toMinutes(open), window.start);
  const end = Math.min(toMinutes(close), window.end);
  const slots: string[] = [];
  for (let minute = start; minute < end; minute += 30) slots.push(formatMinutes(minute));
  return slots;
}

export function windowsForDate(branchId: string, isoDate: string) {
  if (!isoDate) return [];
  const hours = openingHours(branchId, parseISODate(isoDate));
  if (!hours) return [];
  return TIME_WINDOWS.map((window) => ({
    ...window,
    slots: slotsForWindow(hours.open, hours.close, window.id),
  })).filter((window) => window.slots.length > 0);
}

export function windowLabel(id: string): string {
  return TIME_WINDOWS.find((window) => window.id === id)?.label ?? id;
}

export function normalizeSaMobile(input: string): string | null {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('0027')) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 10) digits = `27${digits.slice(1)}`;
  if (!/^27[6-8]\d{8}$/.test(digits)) return null;
  return `+${digits}`;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function toWaNumber(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = `27${digits.slice(1)}`;
  return digits;
}

export function buildConfirmWhatsAppLink(input: {
  whatsappNumber: string;
  branchName: string;
  services: string;
  when: string;
  name: string;
}): string {
  const text = [
    `Hi ${input.branchName}! Please confirm my booking request.`,
    `Branch: ${input.branchName}`,
    `Services: ${input.services}`,
    `Date/time: ${input.when}`,
    `Name: ${input.name}`,
  ].join('\n');
  return `https://wa.me/${toWaNumber(input.whatsappNumber)}?text=${encodeURIComponent(text)}`;
}

export interface BookingDraft {
  mode: 'salon' | 'mobile';
  branchId: string;
  selectedCount: number;
  needsConsent: boolean;
  date: string;
  windowId: string;
  slot: string;
  slotsAvailable: boolean;
  address: string;
  anyStylist: boolean;
  stylist: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
}

export function validateBookingStep(step: 1 | 2 | 3, draft: BookingDraft): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1 && draft.selectedCount < 1) {
    errors.services = 'Select at least one service.';
  }

  if (step === 2) {
    if (!draft.date) {
      errors.date = 'Choose a date.';
    } else if (draft.date < toISODate(new Date())) {
      errors.date = 'Choose today or a future date.';
    } else if (draft.mode === 'salon' && isClosed(draft.branchId, parseISODate(draft.date))) {
      errors.date = closedDayMessage(draft.branchId);
    }

    if (draft.mode === 'mobile') {
      if (draft.address.trim().length < 3) {
        errors.address = 'Enter the address or area we should visit.';
      }
    } else if (!errors.date) {
      if (!draft.windowId) errors.window = 'Choose Morning, Midday or Afternoon.';
      else if (!draft.slotsAvailable) errors.window = 'That window is outside opening hours.';
      else if (!draft.slot) errors.slot = 'Choose a time.';
    }

    if (!draft.anyStylist && draft.stylist.trim().length < 2) {
      errors.stylist = draft.mode === 'mobile'
        ? 'Enter a preferred practitioner, or choose any practitioner.'
        : 'Enter a preferred stylist, or choose any stylist.';
    }
  }

  if (step === 3) {
    if (draft.name.trim().length < 2) errors.name = 'Enter your full name.';
    if (!normalizeSaMobile(draft.phone)) {
      errors.phone = 'Enter a valid South African mobile number, for example 082 123 4567.';
    }
    if (draft.email.trim() && !isValidEmail(draft.email)) {
      errors.email = 'Enter a valid email, or leave it blank.';
    }
    if (draft.needsConsent && !draft.consent) {
      errors.consent = 'Please confirm that a consultation is required first.';
    }
  }

  return errors;
}

export function toServiceLine(
  categoryId: string,
  category: string,
  item: Service,
): BookingServiceLine {
  return {
    categoryId,
    category,
    name: item.name,
    price: item.price,
    fromPrice: isFromPrice(item),
  };
}

export function selectionKey(categoryId: string, name: string): string {
  return `${categoryId}::${name}`;
}
