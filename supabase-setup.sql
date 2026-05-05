-- =====================================================================
-- Mud Run Registration — Supabase schema setup
-- Run this in the Supabase SQL Editor.
-- =====================================================================

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  group_name text,
  total_amount numeric(10, 2) not null default 0,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid')),
  created_at timestamptz not null default now()
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null
    references public.registrations(id) on delete cascade,
  name text not null,
  age int not null check (age >= 0 and age <= 120),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin'
    check (role in ('admin')),
  organization text,
  created_at timestamptz not null default now()
);

create index if not exists idx_participants_registration_id
  on public.participants(registration_id);

create index if not exists idx_registrations_created_at
  on public.registrations(created_at desc);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------

alter table public.registrations enable row level security;
alter table public.participants  enable row level security;
alter table public.profiles      enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- --- registrations policies ---

-- Anyone (anon) can INSERT a new registration.
drop policy if exists "Anyone can register" on public.registrations;
create policy "Anyone can register"
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);

-- Only admins can SELECT.
drop policy if exists "Admins can read registrations" on public.registrations;
create policy "Admins can read registrations"
  on public.registrations
  for select
  to authenticated
  using (public.is_admin());

-- Only admins can UPDATE (e.g. mark as paid).
drop policy if exists "Admins can update registrations" on public.registrations;
create policy "Admins can update registrations"
  on public.registrations
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- --- participants policies ---

-- Anyone can INSERT participants (the form does this right after creating
-- the parent registration row).
drop policy if exists "Anyone can add participants" on public.participants;
create policy "Anyone can add participants"
  on public.participants
  for insert
  to anon, authenticated
  with check (true);

-- Only admins can SELECT.
drop policy if exists "Admins can read participants" on public.participants;
create policy "Admins can read participants"
  on public.participants
  for select
  to authenticated
  using (public.is_admin());

-- --- profiles policies ---

-- Authenticated users can read their own profile (used by is_admin check).
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

-- =====================================================================
-- Creating admin users (manual steps — do this AFTER running the above):
--
-- 1. In Supabase dashboard → Authentication → Users → "Add user" (Invite
--    or create with password). Do this for each of your 2 admins.
--
-- 2. For each admin user, copy their UUID from the Users list and run:
--
--      insert into public.profiles (id, email, role, organization)
--      values ('<paste-user-uuid>', '<their-email>', 'admin', 'Your Org');
--
--    (Or do it via the Table Editor UI.)
--
-- That's it — those users can now log in at /admin/login.
-- =====================================================================
