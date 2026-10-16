import { useMemo, useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { branches } from '@/data/locations';
import { MOBILE_BRANCH_ID, formatRand } from '@/lib/booking';
import { createAdminClient, listBookingRequests, supabaseEnv, updateBookingStatus } from '@/lib/supabase';
import type { BookingRequestRow, BookingStatus } from '@/types/booking';

const STATUSES: BookingStatus[] = ['new', 'confirmed', 'cancelled'];

function branchLabel(id: string): string {
  if (id === MOBILE_BRANCH_ID) return 'Midstream Mobile Aesthetics';
  return branches.find((branch) => branch.id === id)?.name ?? id;
}

export default function AdminPage() {
  const env = supabaseEnv();
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD?.trim() ?? '';
  const [password, setPassword] = useState('');
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [gateError, setGateError] = useState('');
  const [rows, setRows] = useState<BookingRequestRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const visible = useMemo(
    () => (branchFilter === 'all' ? rows : rows.filter((row) => row.branch_id === branchFilter)),
    [rows, branchFilter],
  );

  async function load(nextClient: SupabaseClient) {
    setLoading(true);
    setListError('');
    try {
      setRows(await listBookingRequests(nextClient));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not load requests.';
      setListError(
        `${message} If this is a permission error, set private.app_secrets.admin_password to the same value as VITE_ADMIN_PASSWORD.`,
      );
    } finally {
      setLoading(false);
    }
  }

  function unlock(event: FormEvent) {
    event.preventDefault();
    if (!expectedPassword) return;
    const entered = password.trim();
    if (entered !== expectedPassword) {
      setGateError('That password does not match VITE_ADMIN_PASSWORD.');
      return;
    }
    const nextClient = createAdminClient(entered);
    if (!nextClient) {
      setGateError('Supabase is not configured.');
      return;
    }
    setGateError('');
    setClient(nextClient);
    void load(nextClient);
  }

  async function changeStatus(id: string, status: BookingStatus) {
    if (!client) return;
    const previous = rows;
    setUpdatingId(id);
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
    try {
      await updateBookingStatus(client, id, status);
    } catch (error) {
      setRows(previous);
      setListError(error instanceof Error ? error.message : 'Could not update status.');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4FBF8]">
      <header className="border-b border-sage-100 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-300">Acrylic Game</p>
            <h1 className="font-serif text-3xl font-semibold">Booking requests</h1>
          </div>
          <a href="/" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10">
            Back to the salon
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {!env.configured || !expectedPassword ? (
          <section className="rounded-2xl border border-gold-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-slate-900">Admin setup</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Add <code className="text-sage-800">VITE_SUPABASE_URL</code>, <code className="text-sage-800">VITE_SUPABASE_ANON_KEY</code> and <code className="text-sage-800">VITE_ADMIN_PASSWORD</code> to <code className="text-sage-800">.env</code>, then run <code className="text-sage-800">supabase/booking_requests.sql</code> with the same password.
            </p>
          </section>
        ) : !client ? (
          <form onSubmit={unlock} className="mx-auto max-w-md rounded-2xl border border-sage-100 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-slate-900">Admin sign-in</h2>
            <label className="mt-4 block text-sm font-semibold text-slate-800">
              Password
              <input
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5 min-h-12 w-full rounded-xl border border-sage-200 px-4 text-base outline-none focus:border-sage-500 focus:ring-2 focus:ring-sage-500"
              />
            </label>
            {gateError && <p className="mt-2 text-sm font-medium text-blush-700">{gateError}</p>}
            <button type="submit" className="mt-4 min-h-12 w-full rounded-full bg-slate-900 text-base font-semibold text-white hover:bg-slate-700">
              View requests
            </button>
          </form>
        ) : (
          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Branch
                <select
                  value={branchFilter}
                  onChange={(event) => setBranchFilter(event.target.value)}
                  className="mt-1 block min-h-12 w-full rounded-xl border border-sage-200 bg-white px-3 sm:w-64"
                >
                  <option value="all">All branches</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                  <option value={MOBILE_BRANCH_ID}>Midstream Mobile Aesthetics</option>
                </select>
              </label>
              <p className="text-sm text-slate-600">{loading ? 'Loading…' : `${visible.length} shown`}</p>
            </div>
            {listError && <p className="mb-4 rounded-xl bg-blush-50 px-4 py-3 text-sm text-blush-700">{listError}</p>}
            {!loading && visible.length === 0 && (
              <p className="rounded-2xl border border-sage-100 bg-white px-4 py-8 text-center text-sm text-slate-600">
                No requests for this filter yet.
              </p>
            )}
            <div className="space-y-3">
              {visible.map((row) => (
                <article key={row.id} className="rounded-2xl border border-sage-100 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-slate-900">{row.name}</h2>
                      <p className="text-sm text-slate-600">{branchLabel(row.branch_id)}</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      {row.created_at ? new Date(row.created_at).toLocaleString('en-ZA') : ''}
                    </p>
                  </div>
                  <dl className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                    <div><dt className="text-xs uppercase tracking-wide text-slate-500">When</dt><dd>{row.preferred_date} · {row.time_window}</dd></div>
                    <div><dt className="text-xs uppercase tracking-wide text-slate-500">Contact</dt><dd>{row.phone}{row.email ? ` · ${row.email}` : ''}</dd></div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Services</dt>
                      <dd>{row.services.map((service) => service.name).join(', ') || '—'} · {formatRand(row.estimated_total)}</dd>
                    </div>
                    {row.notes && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs uppercase tracking-wide text-slate-500">Notes</dt>
                        <dd className="whitespace-pre-wrap">{row.notes}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        aria-pressed={row.status === status}
                        disabled={updatingId === row.id}
                        onClick={() => void changeStatus(row.id, status)}
                        className={`min-h-11 rounded-full px-4 text-sm font-semibold capitalize disabled:opacity-60 ${
                          row.status === status
                            ? status === 'cancelled'
                              ? 'bg-blush-600 text-white'
                              : status === 'confirmed'
                                ? 'bg-sage-600 text-white'
                                : 'bg-slate-900 text-white'
                            : 'bg-sage-50 text-slate-700 hover:bg-sage-100'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
