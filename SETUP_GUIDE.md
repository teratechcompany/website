# Segment 1 — Setup & Deployment Guide

## Step 1 — Run on your machine

```bash
cd /home/tita-tera-official/dev/@teratechcompany.tech

# Bootstrap (run once)
npx create-next-app@14.2.5 teratechcompany \
  --typescript --no-tailwind --app --src-dir \
  --import-alias "@/*" --no-eslint --no-turbo

cd teratechcompany

# Install all dependencies
npm install next-auth@4.24.7 mongoose@8.4.4 bcryptjs@2.4.3 \
  zod@3.23.8 resend@3.4.0 isomorphic-dompurify@2.15.0 \
  slugify@1.6.6 sharp@0.33.4 jose@5.6.3 clsx@2.1.1 \
  react-hook-form@7.52.1 @hookform/resolvers@3.9.0

npm install -D @types/bcryptjs@2.4.6 @types/node@20 typescript@5
```

## Step 2 — Copy segment files

Copy every file from this zip into your project, preserving folder structure:
- `middleware.ts`            → project root
- `project-root/*`          → project root (overwrite next.config.js, tsconfig.json, etc.)
- `src/`                    → src/
- `public/`                 → public/

## Step 3 — Environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:
```
NEXTAUTH_SECRET=$(openssl rand -base64 32)
CSRF_SECRET=$(openssl rand -base64 32)
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/
RESEND_API_KEY=re_...
EMAIL_FROM=contact@teratechcompany.tech
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Step 4 — GitHub

```bash
git init
git add -A
git commit -m "feat: Segment 1 — project setup + landing page"

# Create repo at github.com/new, then:
git remote add origin git@github.com:YOUR_ORG/teratechcompany.git
git branch -M main
git push -u origin main
```

## Step 5 — Run locally

```bash
npm run dev
# → http://localhost:3000
```

## Step 6 — Deploy to Vercel

1. Go to https://vercel.com/new
2. Import from GitHub → select `teratechcompany`
3. Add all env vars from `.env.local`
4. Deploy → confirm at teratechcompany.tech

## What's working after Segment 1

- [x] Full landing page (Hero + WebGL + Globe + Metrics + Specialties + Timeline + Testimonials + Lead)
- [x] Navbar (auth-aware, mobile responsive)
- [x] Footer (all links)
- [x] WhatsApp FAB
- [x] Sign in / Register pages
- [x] Auth system (NextAuth + JWT + bcrypt)
- [x] API: register, contact form, newsletter
- [x] Security: CSP headers, rate limiting, input sanitize, CSRF
- [x] Brand file (change colors in brand.css = changes everywhere)
- [x] 404 page
- [x] TypeScript strict mode throughout
- [x] robots.txt

## What comes in Segment 2

- Application portal (5-step form wizard, status tracker, offer acceptance)
- Intern dashboard
- Content pages: Blog, Events, Alumni, Careers, Services, Portfolio, Team, Contact, FAQ
- All remaining MongoDB models
