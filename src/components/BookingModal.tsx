import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AlertCircle, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Service } from '@/data/locations';
import { resolveCatalog } from '@/lib/catalog';
import {
  buildConfirmWhatsAppLink,
  closureSummary,
  estimateSelection,
  formatEstimate,
  formatLongDate,
  formatServicePrice,
  hasPublishedClockHours,
  hoursNote,
  isBookableService,
  isClosed,
  normalizeSaMobile,
  selectionKey,
  serviceDetail,
  serviceNeedsConsultation,
  toISODate,
  toServiceLine,
  validateBookingStep,
  windowLabel,
  windowsForDate,
  type BookingDraft,
  type TimeWindowId,
} from '@/lib/booking';
import { submitBookingRequest } from '@/lib/supabase';
import type { BookingServiceLine, BookingTarget } from '@/types/booking';

interface BookingModalProps {
  target: BookingTarget | null;
  onClose: () => void;
}

const STEP_LABELS = ['Services', 'When', 'Details', 'Review'] as const;
const inputClass =
  'min-h-12 w-full rounded-xl border border-sage-200 bg-white px-4 text-base text-slate-900 outline-none transition-shadow focus:border-sage-500 focus:ring-2 focus:ring-sage-500';

function fieldClass(invalid: boolean) {
  return invalid ? `${inputClass} border-blush-400 focus:border-blush-500 focus:ring-blush-400` : inputClass;
}

export default function BookingModal({ target, onClose }: BookingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const catalog = target ? resolveCatalog(target) : null;
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selected, setSelected] = useState<BookingServiceLine[]>([]);
  const [date, setDate] = useState('');
  const [monthCursor, setMonthCursor] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [windowId, setWindowId] = useState<TimeWindowId | ''>('');
  const [slot, setSlot] = useState('');
  const [address, setAddress] = useState('');
  const [anyStylist, setAnyStylist] = useState(true);
  const [stylist, setStylist] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [stored, setStored] = useState(false);

  useEffect(() => {
    if (!target) return;
    const nextCatalog = resolveCatalog(target);
    const today = new Date();
    const preselected = nextCatalog.categories.flatMap((category) =>
      category.items
        .filter((item) => item.name === target.serviceName && category.id === target.categoryId && isBookableService(item))
        .map((item) => toServiceLine(category.id, category.label, item)),
    );
    setStep(1);
    setSelected(preselected);
    setDate('');
    setMonthCursor(new Date(today.getFullYear(), today.getMonth(), 1));
    setWindowId('');
    setSlot('');
    setAddress('');
    setAnyStylist(true);
    setStylist('');
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setConsent(false);
    setErrors({});
    setSaving(false);
    setSaveError(null);
    setDone(false);
    setStored(false);
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.focus();
      dialogRef.current?.querySelector<HTMLElement>('[data-preselected="true"]')?.scrollIntoView({ block: 'center' });
    });
    return () => cancelAnimationFrame(frame);
  }, [target]);

  useEffect(() => {
    if (!target) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [target]);

  const estimate = useMemo(() => estimateSelection(selected), [selected]);
  const needsConsent = selected.some((item) => serviceNeedsConsultation(item.categoryId, item.name));
  const windows = useMemo(
    () => (catalog && date ? windowsForDate(catalog.branchId, date) : []),
    [catalog, date],
  );
  const activeWindow = windows.find((item) => item.id === windowId);

  if (!target || !catalog) return null;

  const draft = (): BookingDraft => ({
    mode: catalog.mode,
    branchId: catalog.branchId,
    selectedCount: selected.length,
    needsConsent,
    date,
    windowId,
    slot,
    slotsAvailable: Boolean(activeWindow && activeWindow.slots.length > 0),
    address,
    anyStylist,
    stylist,
    name,
    phone,
    email,
    consent,
  });

  function clearError(key: string) {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function goNext() {
    const nextErrors = validateBookingStep(step as 1 | 2 | 3, draft());
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || step === 4) return;
    setStep((current) => (current + 1) as 1 | 2 | 3 | 4);
  }

  function toggleService(categoryId: string, category: string, item: Service) {
    const key = selectionKey(categoryId, item.name);
    setSelected((current) => {
      const exists = current.some((line) => selectionKey(line.categoryId, line.name) === key);
      if (exists) return current.filter((line) => selectionKey(line.categoryId, line.name) !== key);
      return [...current, toServiceLine(categoryId, category, item)];
    });
    clearError('services');
  }

  function selectDate(iso: string) {
    setDate(iso);
    setWindowId('');
    setSlot('');
    clearError('date');
    clearError('window');
    clearError('slot');
  }

  function selectWindow(id: TimeWindowId) {
    setWindowId(id);
    setSlot((current) => {
      const slots = windows.find((item) => item.id === id)?.slots ?? [];
      return slots.includes(current) ? current : '';
    });
    clearError('window');
    clearError('slot');
  }

  const whenLabel = (() => {
    if (!date) return '';
    const day = formatLongDate(date);
    if (catalog.mode === 'mobile') return `${day} · ${address.trim()}`;
    if (!windowId) return day;
    return slot ? `${day} · ${windowLabel(windowId)} · ${slot}` : `${day} · ${windowLabel(windowId)}`;
  })();

  const serviceSummary = selected.map((item) => `${item.name} (${formatServicePrice(item)})`).join(', ');
  const normalizedPhone = normalizeSaMobile(phone);
  const whatsappHref = buildConfirmWhatsAppLink({
    whatsappNumber: catalog.whatsappNumber,
    branchName: catalog.branchName,
    services: serviceSummary || 'To be confirmed',
    when: whenLabel || 'To be confirmed',
    name: name.trim() || 'Guest',
  });

  const submit = async () => {
    const collected = [1, 2, 3].reduce<Record<string, string>>((all, value) => {
      return { ...all, ...validateBookingStep(value as 1 | 2 | 3, draft()) };
    }, {});
    setErrors(collected);
    const firstInvalid = ([1, 2, 3] as const).find((value) =>
      Object.keys(validateBookingStep(value, draft())).length > 0,
    );
    if (firstInvalid) {
      setStep(firstInvalid);
      return;
    }

    const phoneNumber = normalizeSaMobile(phone);
    if (!phoneNumber) return;

    const noteLines = [
      catalog.mode === 'mobile' ? '' : anyStylist ? 'Stylist: any' : `Preferred stylist: ${stylist.trim()}`,
      catalog.mode === 'mobile' && !anyStylist ? `Preferred practitioner: ${stylist.trim()}` : '',
      catalog.mode === 'mobile' && anyStylist ? 'Practitioner: any' : '',
      needsConsent ? 'Consultation required: client acknowledged.' : '',
      notes.trim(),
    ].filter(Boolean);

    setSaving(true);
    setSaveError(null);
    const result = await submitBookingRequest({
      branch_id: catalog.branchId,
      services: selected,
      estimated_total: estimate.amount,
      preferred_date: date,
      time_window: catalog.mode === 'mobile'
        ? `Area: ${address.trim()}`
        : `${windowLabel(windowId)} · ${slot}`,
      name: name.trim(),
      phone: phoneNumber,
      email: email.trim() || null,
      notes: noteLines.join('\n') || null,
    });
    setSaving(false);

    if (result.error) {
      setSaveError(result.error);
      return;
    }

    setStored(result.saved);
    setDone(true);
  };

  function requestClose() {
    if (!saving) onClose();
  }

  const todayIso = toISODate(new Date());
  const maxMonth = new Date();
  maxMonth.setMonth(maxMonth.getMonth() + 6, 1);
  const monthIndex = monthCursor.getFullYear() * 12 + monthCursor.getMonth();
  const minMonthIndex = new Date().getFullYear() * 12 + new Date().getMonth();
  const maxMonthIndex = maxMonth.getFullYear() * 12 + maxMonth.getMonth();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60"
        aria-label="Close booking request"
        onClick={requestClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === 'Escape') requestClose();
        }}
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:max-h-[min(90vh,860px)] sm:max-w-xl sm:rounded-3xl"
      >
        <div className="shrink-0 border-b border-sage-100 px-4 pb-4 pt-4 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-600">{catalog.branchName}</p>
              <h2 id="booking-title" className="font-serif text-3xl font-semibold text-slate-900">
                {done ? 'Request received' : 'Request a booking'}
              </h2>
            </div>
            <button
              type="button"
              onClick={requestClose}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-sage-50 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {!done && (
            <>
              <p className="mt-1 text-sm text-slate-600">The branch confirms availability. This is a request, not a booking.</p>
              <ol className="mt-4 grid grid-cols-4 gap-2">
                {STEP_LABELS.map((label, index) => {
                  const number = index + 1;
                  const reached = step >= number;
                  return (
                    <li key={label}>
                      <div className={`h-1.5 rounded-full ${reached ? 'bg-sage-600' : 'bg-sage-100'}`} />
                      <span className={`mt-1 block text-[11px] font-semibold ${step === number ? 'text-sage-800' : 'text-slate-500'}`}>
                        {number}. {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {done ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-sage-50 px-4 py-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-600 text-white">
                  <Check className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-slate-700">
                  {catalog.branchName} has your request. Nothing is booked until the salon confirms.
                </p>
              </div>
              {!stored && (
                <p className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-800">
                  This request was not stored online. Confirm it on WhatsApp so the salon receives it.
                </p>
              )}
              <Summary
                branchName={catalog.branchName}
                services={selected}
                total={formatEstimate(estimate)}
                when={whenLabel}
                name={name.trim()}
                phone={normalizedPhone || phone}
                email={email.trim()}
                notes={notes.trim()}
                stylist={anyStylist ? (catalog.mode === 'mobile' ? 'Any practitioner' : 'Any stylist') : stylist.trim()}
                needsConsent={needsConsent}
              />
            </div>
          ) : step === 1 ? (
            <div className="space-y-6">
              {errors.services && <ErrorText>{errors.services}</ErrorText>}
              {needsConsent && (
                <p className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm font-medium text-gold-800">
                  A consultation is required first.
                </p>
              )}
              {catalog.categories.map((category) => (
                <section key={category.id}>
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">{category.label}</h3>
                  {category.subtext && <p className="mt-1 text-sm text-slate-600">{category.subtext}</p>}
                  <div className="mt-3 space-y-2">
                    {category.items.filter(isBookableService).map((item) => {
                      const key = selectionKey(category.id, item.name);
                      const pressed = selected.some((line) => selectionKey(line.categoryId, line.name) === key);
                      const consultation = serviceNeedsConsultation(category.id, item.name);
                      return (
                        <button
                          key={key}
                          type="button"
                          data-preselected={target.categoryId === category.id && target.serviceName === item.name ? 'true' : undefined}
                          aria-pressed={pressed}
                          onClick={() => toggleService(category.id, category.label, item)}
                          className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 ${
                            pressed ? 'border-sage-600 bg-sage-50' : 'border-sage-100 bg-white hover:bg-[#F4FBF8] active:bg-sage-100'
                          }`}
                        >
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${pressed ? 'border-sage-600 bg-sage-600 text-white' : 'border-sage-300'}`}>
                            {pressed && <Check className="h-3.5 w-3.5" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-slate-900">{item.name}</span>
                            {serviceDetail(item) && <span className="mt-0.5 block text-sm text-slate-600">{serviceDetail(item)}</span>}
                            {consultation && (
                              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-gold-700">
                                Consultation first
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 font-serif text-lg font-bold text-sage-700">{formatServicePrice(item)}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : step === 2 ? (
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">Preferred date</h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label="Previous month"
                      disabled={monthIndex <= minMonthIndex}
                      onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
                      className="rounded-full border border-sage-200 p-2 text-slate-600 enabled:hover:bg-sage-50 disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      disabled={monthIndex >= maxMonthIndex}
                      onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
                      className="rounded-full border border-sage-200 p-2 text-slate-600 enabled:hover:bg-sage-50 disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mb-3 text-sm font-medium text-slate-700">
                  {monthCursor.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}
                  {closureSummary(catalog.branchId) ? ` · ${closureSummary(catalog.branchId)}` : ''}
                </p>
                <Calendar
                  month={monthCursor}
                  selected={date}
                  todayIso={todayIso}
                  branchId={catalog.branchId}
                  mobile={catalog.mode === 'mobile'}
                  onSelect={selectDate}
                />
                {errors.date && <ErrorText>{errors.date}</ErrorText>}
              </div>

              {catalog.mode === 'mobile' ? (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-800">Address or area</span>
                  <textarea
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                      clearError('address');
                    }}
                    rows={3}
                    placeholder="Street, complex or area in Midstream"
                    className={`${fieldClass(Boolean(errors.address))} min-h-24 py-3`}
                  />
                  <span className="mt-1 block text-xs text-slate-500">We come to you, so there is no salon time slot.</span>
                  {errors.address && <ErrorText>{errors.address}</ErrorText>}
                </label>
              ) : (
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">Time</h3>
                  <p className="mt-1 text-sm text-slate-600">{hoursNote(catalog.branchId)}</p>
                  {!hasPublishedClockHours(catalog.branchId) && (
                    <p className="mt-1 text-xs text-slate-500">Published clock hours are not on file for this branch.</p>
                  )}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {(['morning', 'midday', 'afternoon'] as const).map((id) => {
                      const available = windows.some((item) => item.id === id);
                      const label = windowLabel(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={!date || !available}
                          aria-pressed={windowId === id}
                          onClick={() => selectWindow(id)}
                          className={`min-h-12 rounded-xl px-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                            windowId === id ? 'bg-sage-600 text-white' : 'bg-sage-50 text-slate-800 hover:bg-sage-100'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.window && <ErrorText>{errors.window}</ErrorText>}
                  {activeWindow && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeWindow.slots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          aria-pressed={slot === time}
                          onClick={() => {
                            setSlot(time);
                            clearError('slot');
                          }}
                          className={`min-h-11 min-w-[4.5rem] rounded-full px-3 text-sm font-semibold ${
                            slot === time ? 'bg-slate-900 text-white' : 'bg-white text-slate-800 ring-1 ring-sage-200 hover:bg-sage-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.slot && <ErrorText>{errors.slot}</ErrorText>}
                </div>
              )}

              <div>
                <h3 className="font-serif text-2xl font-semibold text-slate-900">
                  {catalog.mode === 'mobile' ? 'Practitioner' : 'Stylist'}
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    aria-pressed={anyStylist}
                    onClick={() => {
                      setAnyStylist(true);
                      clearError('stylist');
                    }}
                    className={`min-h-12 rounded-xl px-3 text-sm font-semibold ${anyStylist ? 'bg-slate-900 text-white' : 'bg-sage-50 text-slate-800'}`}
                  >
                    {catalog.mode === 'mobile' ? 'Any practitioner' : 'Any stylist'}
                  </button>
                  <button
                    type="button"
                    aria-pressed={!anyStylist}
                    onClick={() => setAnyStylist(false)}
                    className={`min-h-12 rounded-xl px-3 text-sm font-semibold ${!anyStylist ? 'bg-slate-900 text-white' : 'bg-sage-50 text-slate-800'}`}
                  >
                    Preferred
                  </button>
                </div>
                {!anyStylist && (
                  <input
                    value={stylist}
                    onChange={(event) => {
                      setStylist(event.target.value);
                      clearError('stylist');
                    }}
                    placeholder={catalog.mode === 'mobile' ? 'Preferred practitioner' : 'Preferred stylist'}
                    className={`${fieldClass(Boolean(errors.stylist))} mt-2`}
                  />
                )}
                {errors.stylist && <ErrorText>{errors.stylist}</ErrorText>}
              </div>
            </div>
          ) : step === 3 ? (
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-800">Full name</span>
                <input
                  value={name}
                  autoComplete="name"
                  onChange={(event) => {
                    setName(event.target.value);
                    clearError('name');
                  }}
                  className={fieldClass(Boolean(errors.name))}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-800">Mobile number</span>
                <input
                  value={phone}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="082 123 4567"
                  onChange={(event) => {
                    setPhone(event.target.value);
                    clearError('phone');
                  }}
                  className={fieldClass(Boolean(errors.phone))}
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-800">Email (optional)</span>
                <input
                  value={email}
                  type="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearError('email');
                  }}
                  className={fieldClass(Boolean(errors.email))}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-800">Notes (optional)</span>
                <textarea
                  value={notes}
                  rows={4}
                  maxLength={1000}
                  placeholder="Hair length, allergies, reference photo link"
                  onChange={(event) => setNotes(event.target.value)}
                  className={`${inputClass} min-h-28 py-3`}
                />
              </label>
              {needsConsent && (
                <label className={`flex min-h-12 items-start gap-3 rounded-xl border px-4 py-3 ${errors.consent ? 'border-blush-400 bg-blush-50' : 'border-gold-200 bg-gold-50'}`}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      clearError('consent');
                    }}
                    className="mt-1 h-5 w-5 accent-sage-700"
                  />
                  <span className="text-sm font-medium text-slate-800">
                    A consultation is required first. I understand this request does not book the treatment.
                  </span>
                </label>
              )}
              {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
            </div>
          ) : (
            <div className="space-y-4">
              <Summary
                branchName={catalog.branchName}
                services={selected}
                total={formatEstimate(estimate)}
                when={whenLabel}
                name={name.trim()}
                phone={normalizedPhone || phone}
                email={email.trim()}
                notes={notes.trim()}
                stylist={anyStylist ? (catalog.mode === 'mobile' ? 'Any practitioner' : 'Any stylist') : stylist.trim()}
                needsConsent={needsConsent}
              />
              <div className="flex flex-wrap gap-2">
                <EditButton onClick={() => setStep(1)}>Edit services</EditButton>
                <EditButton onClick={() => setStep(2)}>Edit date</EditButton>
                <EditButton onClick={() => setStep(3)}>Edit details</EditButton>
              </div>
              {saveError && (
                <div className="space-y-3">
                  <ErrorText>We could not store the request. {saveError}</ErrorText>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-green-600 px-5 text-sm font-semibold text-white"
                  >
                    Send details on WhatsApp instead
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-sage-100 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          {!done && (
            <div className="mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Estimated total</p>
              <p className="font-serif text-2xl font-semibold leading-none text-sage-800">{formatEstimate(estimate)}</p>
              <p className="mt-1 text-[11px] text-slate-500">Prices are guidelines; confirmed at consultation.</p>
            </div>
          )}
          {done ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-green-600 px-5 text-base font-semibold text-white hover:bg-green-700"
              >
                Confirm on WhatsApp
              </a>
              <button
                type="button"
                onClick={requestClose}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-sage-300 px-5 text-base font-semibold text-slate-800 hover:bg-sage-50"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((current) => (current - 1) as 1 | 2 | 3 | 4)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-full border border-sage-300 px-4 text-base font-semibold text-slate-800 hover:bg-sage-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-full bg-slate-900 px-4 text-base font-semibold text-white hover:bg-slate-700"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={saving}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-sage-600 px-4 text-base font-semibold text-white hover:bg-sage-700 disabled:opacity-60"
                >
                  {saving ? 'Sending request…' : 'Send request'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-blush-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

function EditButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-10 rounded-full bg-sage-50 px-4 text-sm font-semibold text-sage-800">
      {children}
    </button>
  );
}

function Summary({
  branchName,
  services,
  total,
  when,
  name,
  phone,
  email,
  notes,
  stylist,
  needsConsent,
}: {
  branchName: string;
  services: BookingServiceLine[];
  total: string;
  when: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  stylist: string;
  needsConsent: boolean;
}) {
  return (
    <dl className="space-y-3 rounded-2xl border border-sage-100 bg-[#F4FBF8] px-4 py-4 text-sm">
      <Row label="Branch" value={branchName} />
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Services</dt>
        <dd className="mt-1 space-y-1">
          {services.map((item) => (
            <p key={selectionKey(item.categoryId, item.name)} className="flex justify-between gap-3 text-slate-800">
              <span>{item.name}</span>
              <span className="shrink-0 font-semibold text-sage-800">{formatServicePrice(item)}</span>
            </p>
          ))}
        </dd>
      </div>
      <Row label="Estimated total" value={total} />
      <Row label="When" value={when} />
      <Row label="Stylist" value={stylist} />
      <Row label="Name" value={name} />
      <Row label="Mobile" value={phone} />
      {email && <Row label="Email" value={email} />}
      {notes && <Row label="Notes" value={notes} />}
      {needsConsent && <Row label="Consultation" value="Required first — acknowledged" />}
      <p className="text-xs text-slate-500">Prices are guidelines; confirmed at consultation.</p>
    </dl>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap font-medium text-slate-800">{value}</dd>
    </div>
  );
}

function Calendar({
  month,
  selected,
  todayIso,
  branchId,
  mobile,
  onSelect,
}: {
  month: Date;
  selected: string;
  todayIso: string;
  branchId: string;
  mobile: boolean;
  onSelect: (iso: string) => void;
}) {
  const year = month.getFullYear();
  const monthNumber = month.getMonth();
  const firstWeekday = new Date(year, monthNumber, 1).getDay();
  const days = new Date(year, monthNumber + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((label) => (
          <span key={label} className="py-1">{label}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;
          const iso = toISODate(new Date(year, monthNumber, day));
          const closed = !mobile && isClosed(branchId, new Date(year, monthNumber, day));
          const past = iso < todayIso;
          const disabled = closed || past;
          const label = new Date(year, monthNumber, day).toLocaleDateString('en-ZA', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          });
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={selected === iso}
              aria-current={iso === todayIso ? 'date' : undefined}
              aria-label={disabled ? `${label}, unavailable` : `Select ${label}`}
              onClick={() => onSelect(iso)}
              className={`h-11 rounded-xl text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:text-slate-300 ${
                selected === iso
                  ? 'bg-sage-600 text-white'
                  : iso === todayIso
                    ? 'bg-white text-sage-800 ring-1 ring-sage-400 hover:bg-sage-50'
                    : 'bg-white text-slate-800 hover:bg-sage-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
