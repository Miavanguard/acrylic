-- Acrylic Game booking requests
-- Run this once in the Supabase SQL editor.
--
-- Env vars the site reads (Vite, prefix VITE_):
--   VITE_SUPABASE_URL
--   VITE_SUPABASE_ANON_KEY
--   VITE_ADMIN_PASSWORD
--
-- Replace the password below with the SAME value as VITE_ADMIN_PASSWORD
-- before you run the script.

create extension if not exists pgcrypto;

create schema if not exists private;

create table if not exists private.app_secrets (
  key text primary key,
  value text not null
);

insert into private.app_secrets (key, value)
values ('admin_password', $pwd$replace-with-VITE_ADMIN_PASSWORD$pwd$)
on conflict (key) do update set value = excluded.value;

revoke all on schema private from public;
revoke all on table private.app_secrets from public, anon, authenticated;
alter table private.app_secrets enable row level security;

create or replace function private.admin_password_matches()
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  raw text;
  header text;
  secret text;
begin
  raw := pg_catalog.current_setting('request.headers', true);
  if raw is null or pg_catalog.btrim(raw) = '' then
    return false;
  end if;

  begin
    header := raw::json ->> 'x-admin-key';
  exception
    when others then
      return false;
  end;

  if header is null or header = '' then
    return false;
  end if;

  select value into secret
  from private.app_secrets
  where key = 'admin_password';

  return secret is not null and header = secret;
end;
$$;

revoke all on function private.admin_password_matches() from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.admin_password_matches() to anon, authenticated;

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  branch_id text not null,
  services jsonb not null,
  estimated_total numeric(12, 2) not null default 0,
  preferred_date date not null,
  time_window text not null,
  name text not null,
  phone text not null,
  email text,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint booking_requests_status_check
    check (status in ('new', 'confirmed', 'cancelled')),
  constraint booking_requests_services_array
    check (jsonb_typeof(services) = 'array'),
  constraint booking_requests_total_nonnegative
    check (estimated_total >= 0)
);

create index if not exists booking_requests_branch_created_idx
  on public.booking_requests (branch_id, created_at desc);

alter table public.booking_requests enable row level security;
alter table public.booking_requests force row level security;

revoke all on table public.booking_requests from public, anon, authenticated;
grant insert on table public.booking_requests to anon, authenticated;
grant select, update (status) on table public.booking_requests to anon, authenticated;

drop policy if exists booking_requests_anon_insert on public.booking_requests;
create policy booking_requests_anon_insert
on public.booking_requests
for insert
to anon, authenticated
with check (
  status = 'new'
  and char_length(btrim(branch_id)) > 0
  and char_length(btrim(name)) > 0
  and char_length(btrim(phone)) > 0
  and jsonb_typeof(services) = 'array'
);

drop policy if exists booking_requests_admin_select on public.booking_requests;
create policy booking_requests_admin_select
on public.booking_requests
for select
to anon, authenticated
using (private.admin_password_matches());

drop policy if exists booking_requests_admin_update on public.booking_requests;
create policy booking_requests_admin_update
on public.booking_requests
for update
to anon, authenticated
using (private.admin_password_matches())
with check (
  private.admin_password_matches()
  and status in ('new', 'confirmed', 'cancelled')
);

-- Visitors can INSERT only. SELECT and status UPDATE require the
-- x-admin-key header to match private.app_secrets.admin_password.
-- The anon key stays in the browser. Do not put the service role key in Vite.
