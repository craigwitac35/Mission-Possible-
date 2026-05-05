# Mud Run Registration

Simple Next.js + Supabase event registration site.

## Stack

- Next.js (Pages Router) + TypeScript
- Supabase (Postgres + Auth)
- Plain CSS (swap for Tailwind later if you want)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a project, then grab:
- Project URL
- `anon` public API key
- `service_role` secret key (server-only)

From: Project Settings → API.

### 3. Run the database setup

In the Supabase dashboard → SQL Editor, paste and run the contents of
`supabase-setup.sql`. This creates the 3 tables (`registrations`,
`participants`, `profiles`) and the Row Level Security policies.

### 4. Create admin users

In Supabase dashboard → Authentication → Users:
1. Click "Add user" → create your 2 admin accounts with email + password.
2. Copy each user's UUID.
3. In SQL Editor, run for each:

```sql
insert into public.profiles (id, email, role, organization)
values ('<paste-uuid>', '<their-email>', 'admin', 'Your Org Name');
```

### 5. Set environment variables

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and fill in your Supabase values.

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Purpose |
|---|---|
| `/` | Landing page |
| `/register` | Public registration form |
| `/confirmation` | Post-submit confirmation |
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Stats overview |
| `/admin/registrations` | List of all registrations |
| `/admin/registration/[id]` | Detail + payment status update |

## Pricing Logic

Lives in `lib/pricing.ts`. Dates use the current year automatically.

- **Early Bird** (until July 30): Adult $25, Child $10
- **Regular** (July 31 – Aug 10): Adult $35, Child $15
- **After Aug 10**: registration closed

Adult = age > 13. Child = age ≤ 13.

## Security Notes

- The public registration form uses the anon key to insert into
  `registrations` and `participants`. RLS policies in `supabase-setup.sql`
  allow anonymous INSERTs but block anonymous SELECTs/UPDATEs.
- All admin reads/writes require an authenticated user with a row in
  `profiles` with `role = 'admin'`. The `is_admin()` SQL function gates
  every admin-side policy.
- The `service_role` key is only used by `getServiceSupabase()` in
  `lib/supabaseClient.ts`, which is server-side only. Don't import it in
  client components.

## What's Intentionally NOT Built Yet

- Payment processing (Givebutter or otherwise)
- Public user accounts
- Email confirmations
- Custom design / final copy

These are stubs and can be layered in later without restructuring.
