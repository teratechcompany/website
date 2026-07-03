# Segment 2 — Integration Guide

## What this segment delivers

- Brand system updated (orange removed from headings/titles — now a button/accent-only color)
- Full application portal: 5-step form → status tracker → offer → withdraw
- All public pages: About, Services, Portfolio, Team, Contact, FAQ, Partners, Newsletter, Search
- Content pages: Blog, Events, Alumni + submission form, Careers, Volunteer
- All 6 legal pages: Privacy, Terms, Cookies, Accessibility, Intern Code, Data Request
- 7 new MongoDB models: Application, BlogPost, Event, AlumniProfile, CareerPost, TeamMember, AuditLog
- API routes: applications (CRUD), alumni, blog, events, careers, search, volunteer
- Email templates: application received, status update

## How to integrate

### 1. Replace style files
These 3 files REPLACE what was in Segment 1 — they contain the orange fix:
- `src/styles/brand.css`       → replace
- `src/styles/globals.css`     → replace
- `src/styles/components.css`  → replace

### 2. Add all new files
Every other file in this zip is net-new. Copy into your project preserving folder paths.

### 3. New dependencies needed
None — Segment 1 dependencies cover everything in Segment 2.

### 4. Test after integration
```bash
npm run type-check   # should pass with 0 errors
npm run dev          # verify all routes load
```

### 5. Key routes to verify
| Route                  | What to check                               |
|------------------------|---------------------------------------------|
| /services              | All 8 tracks render                         |
| /apply                 | 5-step form advances, validation works      |
| /apply/success         | Shows after form submission                 |
| /portal                | Redirects to /login if not authenticated    |
| /portal/status         | Shows status tracker                        |
| /alumni/submit         | Form submits to MongoDB                     |
| /faq                   | Accordion opens/closes                      |
| /contact               | Contact form sends email via Resend         |
| /legal/privacy         | All 6 legal pages render                    |
| /volunteer             | Volunteer form submits                      |

## Orange usage going forward

The brand.css update enforces this:

| Element                | Color    |
|------------------------|----------|
| Headings (h1/h2/h3)    | White    |
| Eyebrow labels         | Cool blue-white (--text-eyebrow) |
| Stats/metrics          | Cyan     |
| Primary CTA buttons    | Orange (pill shape) |
| Secondary CTAs         | Blue (sharp) |
| Quote marks on cards   | Blue     |
| Badge dots, time labels| Orange (subtle accent only) |

## What comes in Segment 3

- Internal HR system (/internal): ATS pipeline, intern management, leave, reviews
- Finance & Payroll system
- Full admin panel (/admin): CMS, user management, audit log
- Blog post / event detail pages ([slug] routes)
- Upload API wired to Cloudinary
- OG image API for social sharing
- XML sitemap generator
