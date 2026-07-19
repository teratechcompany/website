# Segment 4 Patch — Credentials & Auth Setup

## The problem this solves
Protected routes (/internal, /admin, /portal) require a logged-in session.
This patch gives you three ways to get credentials, plus the full forgot
password flow and email verification.

## ─── FASTEST: Run the seed script ───────────────────────────────────

This creates the admin account immediately. Do this first.

### 1. Install tsx (run once)
```bash
npm install -D tsx dotenv
```

### 2. Run seed-admin (creates Sir Tita Tera as admin)
```bash
npx tsx scripts/seed-admin.ts
```

Output:
  ╔══════════════════════════════════════════════╗
  ║  ✅  Admin account created                   ║
  ║  Email    : admin@teratechcompany.tech       ║
  ║  Password : TeraAdmin2025!                   ║
  ║  Role     : admin                            ║
  ╚══════════════════════════════════════════════╝

### 3. Sign in at /login
  Email:    admin@teratechcompany.tech
  Password: TeraAdmin2025!

### 4. Change the password immediately
  Go to /admin/users → find your account → change password via profile settings
  (or delete the admin account and re-seed with your own credentials via env vars)

## ─── Seed with custom credentials ──────────────────────────────────
```bash
ADMIN_NAME="Your Name" \
ADMIN_EMAIL="you@teratechcompany.tech" \
ADMIN_PASSWORD="YourStrongPass1" \
npx tsx scripts/seed-admin.ts
```

## ─── Seed all team members ──────────────────────────────────────────
Creates accounts for all 8 team members with correct roles:
```bash
npx tsx scripts/seed-team.ts
```

Default passwords (change after first login):
  Sir Tita Tera + Engr. Nde Alban  → TeraAdmin2025!  (admin role)
  Engr. Faye Rauda                  → TeraHR2025!     (hr_admin role)
  All other staff                   → TeraStaff2025!  (staff role)

## ─── Already have an account? Promote it to admin ──────────────────

If you registered via /register and need admin access:

1. Add to .env.local:
   PROMOTE_SECRET=any-long-random-string-you-choose

2. Restart dev server

3. Run this curl command (or use Postman/Thunder Client):
```bash
curl -X POST http://localhost:3000/api/auth/promote \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","secret":"your-PROMOTE_SECRET"}'
```

4. Sign in at /login

5. Remove PROMOTE_SECRET from .env.local after setup.

## ─── Role access map ────────────────────────────────────────────────

| Route prefix    | Roles allowed                              |
|-----------------|--------------------------------------------|
| /portal         | applicant, intern, staff, hr_admin, admin  |
| /internal       | staff, hr_admin, admin                     |
| /admin          | admin only                                 |

## ─── What else is in this patch ─────────────────────────────────────

scripts/seed-admin.ts          → Creates one admin account
scripts/seed-team.ts           → Creates all 8 team accounts

src/app/api/auth/promote/      → Promote any account to admin via secret
src/app/api/auth/reset/        → Request password reset email
src/app/api/auth/reset/[token] → Submit new password with token
src/app/api/auth/verify/       → Email verification link handler
src/lib/db/models/ResetToken.ts → MongoDB model for reset/verify tokens

src/app/(auth)/login/page.tsx  → Updated: forgot password link + verified banner
src/app/(auth)/forgot/page.tsx → Forgot password form
src/app/(auth)/reset/[token]/  → New password form
src/app/(auth)/verify/page.tsx → Email verification landing page

## ─── .env.local additions ───────────────────────────────────────────

Add these (PROMOTE_SECRET is optional, only needed for the promote flow):

```
PROMOTE_SECRET=delete-this-after-setup-change-me
```

## ─── Integration ─────────────────────────────────────────────────────

### Files to REPLACE (updated versions):
- src/app/(auth)/login/page.tsx   ← replace Segment 1 version

### Files to ADD (all new):
- Everything else in this zip

### No new npm dependencies needed.
