# Refactoring App Architecture & CSS Management (Detailed Plan)

## Goal Description

The current application relies heavily on inline CSS (`style={{...}}`) across 900+ instances in both reusable components and page layouts. This plan outlines a granular, component-by-component strategy to migrate to Vanilla CSS with **Next.js CSS Modules (`.module.css`)**. 

The UI and UX will remain **100% identical**. The only changes will be architectural: extracting inline objects into CSS classes for improved maintainability.

## User Review Required

> [!IMPORTANT]
> Please review this step-by-step execution plan and the Git workflow. Once approved, I will create the new branch, begin executing Phase 1, and create the corresponding CSS Module files.

## Git Workflow & Setup

Before any files are modified, we will create a dedicated branch for this refactoring effort to keep the `main` branch clean and safe.

- **Action:** Run `git checkout -b refactor/css-modules-migration`

At the end of *every* phase, after the testing protocol passes, we will commit the progress to this branch.

---

## Detailed Execution Plan & Testing Strategy

To ensure zero visual regressions, the refactoring is broken down into small, logical phases. We will perform a build check and visual verification at the end of every single phase.

### Phase 1: Shared UI Components (The Foundation)
These are the smallest building blocks. We must refactor these first because they are used everywhere else in the application.

- [x] **`src/components/ui/`**
  - [x] `Button.tsx` ➡️ `Button.module.css`
  - [x] `Input.tsx` ➡️ `Input.module.css`
  - [x] `Badge.tsx` ➡️ `Badge.module.css`

> [!TIP]
> **Phase 1 Testing & Commit Protocol**
> - Run `npm run build` to ensure modules compile.
> - Run `npm run dev` and navigate to a page containing these basic elements to verify buttons and inputs look identical.
> - **Commit:** `git add . && git commit -m "refactor: extract UI components to CSS modules (Phase 1)"`

---

### Phase 2: Form Components & Layouts
Moving up the dependency tree, we tackle complex forms and the global layouts that wrap the application.

- [x] **`src/components/forms/ApplicationForm/`**
  - [x] `index.tsx` ➡️ `ApplicationForm.module.css`
  - [x] `Step1Personal.tsx` ➡️ `Step1Personal.module.css`
  - [x] `Step2Track.tsx` ➡️ `Step2Track.module.css`
  - [x] `Step3Background.tsx` ➡️ `Step3Background.module.css`
  - [x] `Step4Documents.tsx` ➡️ `Step4Documents.module.css`
  - [x] `Step5Review.tsx` ➡️ `Step5Review.module.css`

- [x] **`src/components/layout/`**
  - [x] `Navbar.tsx` ➡️ `Navbar.module.css`
  - [x] `Footer.tsx` ➡️ `Footer.module.css`

> [!TIP]
> **Phase 2 Testing & Commit Protocol**
> - Run `npm run lint` and `npm run build`.
> - Visual Check: Verify that the Navbar, Footer, and Application form layout (spacing, alignment) remain unchanged.
> - **Commit:** `git add . && git commit -m "refactor: extract Forms and Layout to CSS modules (Phase 2)"`

---

### Phase 3: Home Page & Marketing Sections
Refactoring the landing page components to ensure the public-facing site remains visually perfect.

- [x] **`src/components/sections/home/`**
  - [x] `HeroSection.tsx` ➡️ `HeroSection.module.css`
  - [x] `LeadSection.tsx` ➡️ `LeadSection.module.css`
  - [x] `MetricsSection.tsx` ➡️ `MetricsSection.module.css`
  - [x] `SpecialtiesSection.tsx` ➡️ `SpecialtiesSection.module.css`
  - [x] `TestimonialsSection.tsx` ➡️ `TestimonialsSection.module.css`
  - [x] `TimelineSection.tsx` ➡️ `TimelineSection.module.css`

- [x] **`src/components/sections/shared/` & `content/`**
  - [x] `WhatsAppFAB.tsx` ➡️ `WhatsAppFAB.module.css`
  - [x] `NewsletterBanner.tsx` ➡️ `NewsletterBanner.module.css`
  - [ x] `TeamCard.tsx` ➡️ `TeamCard.module.css`

> [!TIP]
> **Phase 3 Testing & Commit Protocol**
> - Visual Check: Load the home page (`/`). Verify all sections are aligned, responsive design holds up, and animations/spacing are intact. Check the WhatsApp floating button and Newsletter banner.
> - **Commit:** `git add . && git commit -m "refactor: extract Home and Marketing sections to CSS modules (Phase 3)"`

---

### Phase 4: The Intern Portal & Internal Admin Tools
Refactoring the authenticated sections of the app (the portal and internal dashboards).

- [x] **`src/components/portal/`**
  - [x] `StatusTracker.tsx` ➡️ `StatusTracker.module.css`
  - [x] `OnboardingChecklist.tsx` ➡️ `OnboardingChecklist.module.css`
  - [x] `OfferCard.tsx` ➡️ `OfferCard.module.css`
  - [x] `FileUploader.tsx` ➡️ `FileUploader.module.css`

- [x] **`src/components/admin/` & `internal/`**
  - [x] `UserRoleManager.tsx` ➡️ `UserRoleManager.module.css`
  - [x] `AlumniActions.tsx` ➡️ `AlumniActions.module.css`
  - [x] `AddPartnerForm.tsx` ➡️ `AddPartnerForm.module.css`
  - [x] `LeaveActions.tsx` ➡️ `LeaveActions.module.css`

> [!TIP]
> **Phase 4 Testing & Commit Protocol**
> - Visual Check: Verify `/portal` and `/internal` routes. Ensure tables, action buttons, file uploaders, and status trackers render correctly.
> - **Commit:** `git add . && git commit -m "refactor: extract Portal and Admin tools to CSS modules (Phase 4)"`

---

### Phase 5: Page-Level Refactoring (`src/app/`)
Finally, we refactor the actual Next.js page files that glue the components together, replacing any lingering inline styles on `<div>` wrappers and `<main>` tags.

- [x] **Public Pages**
  - [x] `src/app/not-found.tsx`
  - [x] `src/app/volunteer/page.tsx`

- [x] **Portal Routes (`src/app/portal/`)**
  - [x] `layout.tsx` (Portal Shell)
  - [x] `page.tsx` (Portal Dashboard)
  - [x] `offer/page.tsx`
  - [x] `onboarding/page.tsx`
  - [x] `status/page.tsx`
  - [x] `withdraw/page.tsx`
  - [x] `documents/page.tsx`

- [x] **Internal Routes (`src/app/internal/`)**
  - [x] `layout.tsx` (Admin Shell)
  - [x] `page.tsx`
  - [x] `projects/page.tsx`
  - [x] `interns/page.tsx`
  - [x] `reports/page.tsx`
  - [x] `finance/page.tsx` (and sub-pages)
  - [x] `docs/page.tsx`
  - [x] `comms/page.tsx`
  - [x] `ats/[id]/page.tsx`

> [!TIP]
> **Final Phase 5 Testing & Commit Protocol**
> - Full Application Build (`npm run build`).
> - Comprehensive visual click-through of the entire platform to ensure total parity.
> - Run a final search for `style={{` to confirm 100% removal.
> - **Commit:** `git add . && git commit -m "refactor: extract Page layouts to CSS modules (Phase 5)"`
> - **Push:** `git push origin refactor/css-modules-migration`
