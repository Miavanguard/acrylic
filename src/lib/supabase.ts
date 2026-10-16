import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { BookingRequest, BookingRequestRow, BookingStatus } from '@/types/booking';

let browserClient: SupabaseClient | null | undefined;

export function supabaseEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '';
  return { url, anonKey, configured: Boolean(url && anonKey) };
}

export function getSupabase(): SupabaseClient | null {
  if (browserClient !== undefined) return browserClient;
  const { url, anonKey, configured } = supabaseEnv();
  browserClient = configured ? createClient(url, anonKey) : null;
  return browserClient;
}

export function createAdminClient(password: string): SupabaseClient | null {
  const { url, anonKey, configured } = supabaseEnv();
  if (!configured) return null;
  return createClient(url, anonKey, {
    global: { headers: { 'x-admin-key': password } },
  });
}

export async function submitBookingRequest(
  request: BookingRequest,
): Promise<{ saved: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) {
    console.info('[booking] Supabase env vars missing. Request logged for the demo:', request);
    return { saved: false };
  }

  const { error } = await client.from('booking_requests').insert({
    branch_id: request.branch_id,
    services: request.services,
    estimated_total: request.estimated_total,
    preferred_date: request.preferred_date,
    time_window: request.time_window,
    name: request.name,
    phone: request.phone,
    email: request.email,
    notes: request.notes,
  });

  if (error) {
    console.error('[booking] Supabase insert failed:', error.message);
    return { saved: false, error: error.message };
  }

  return { saved: true };
}

function asStatus(value: unknown): BookingStatus {
  if (value === 'confirmed' || value === 'cancelled' || value === 'new') return value;
  return 'new';
}

function asServices(value: unknown): BookingRequestRow['services'] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const row = item as Record<string, unknown>;
    if (typeof row.name !== 'string') return [];
    return [{
      categoryId: typeof row.categoryId === 'string' ? row.categoryId : '',
      category: typeof row.category === 'string' ? row.category : '',
      name: row.name,
      price: typeof row.price === 'string' ? row.price : '',
      fromPrice: Boolean(row.fromPrice),
    }];
  });
}

export function normalizeBookingRow(value: unknown): BookingRequestRow | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== 'string' || typeof row.branch_id !== 'string') return null;
  return {
    id: row.id,
    branch_id: row.branch_id,
    services: asServices(row.services),
    estimated_total: Number(row.estimated_total ?? 0) || 0,
    preferred_date: typeof row.preferred_date === 'string' ? row.preferred_date : '',
    time_window: typeof row.time_window === 'string' ? row.time_window : '',
    name: typeof row.name === 'string' ? row.name : '',
    phone: typeof row.phone === 'string' ? row.phone : '',
    email: typeof row.email === 'string' ? row.email : null,
    notes: typeof row.notes === 'string' ? row.notes : null,
    status: asStatus(row.status),
    created_at: typeof row.created_at === 'string' ? row.created_at : '',
  };
}

export async function listBookingRequests(client: SupabaseClient): Promise<BookingRequestRow[]> {
  const { data, error } = await client
    .from('booking_requests')
    .select('id, branch_id, services, estimated_total, preferred_date, time_window, name, phone, email, notes, status, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) throw new Error(error.message);
  return (data ?? []).flatMap((row) => {
    const normalized = normalizeBookingRow(row);
    return normalized ? [normalized] : [];
  });
}

export async function updateBookingStatus(
  client: SupabaseClient,
  id: string,
  status: BookingStatus,
): Promise<void> {
  const { data, error } = await client
    .from('booking_requests')
    .update({ status })
    .eq('id', id)
    .select('id');

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    throw new Error('Status was not updated. Check the admin password matches the database secret.');
  }
}
