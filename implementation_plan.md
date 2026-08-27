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

- [ ] **`src/components/ui/`**
  - [ ] `Button.tsx` ➡️ `Button.module.css`
  - [ ] `Input.tsx` ➡️ `Input.module.css`
  - [ ] `Badge.tsx` ➡️ `Badge.module.css`

> [!TIP]
> **Phase 1 Testing & Commit Protocol**
> - Run `npm run build` to ensure modules compile.
> - Run `npm run dev` and navigate to a page containing these basic elements to verify buttons and inputs look identical.
> - **Commit:** `git add . && git commit -m "refactor: extract UI components to CSS modules (Phase 1)"`

---

### Phase 2: Form Components & Layouts
Moving up the dependency tree, we tackle complex forms and the global layouts that wrap the application.

- [ ] **`src/components/forms/ApplicationForm/`**
  - [ ] `index.tsx` ➡️ `ApplicationForm.module.css`
  - [ ] `Step1Personal.tsx` ➡️ `Step1Personal.module.css`
  - [ ] `Step2Track.tsx` ➡️ `Step2Track.module.css`
  - [ ] `Step3Background.tsx` ➡️ `Step3Background.module.css`
  - [ ] `Step4Documents.tsx` ➡️ `Step4Documents.module.css`
  - [ ] `Step5Review.tsx` ➡️ `Step5Review.module.css`

- [ ] **`src/components/layout/`**
  - [ ] `Navbar.tsx` ➡️ `Navbar.module.css`
  - [ ] `Footer.tsx` ➡️ `Footer.module.css`

> [!TIP]
> **Phase 2 Testing & Commit Protocol**
> - Run `npm run lint` and `npm run build`.
> - Visual Check: Verify that the Navbar, Footer, and Application form layout (spacing, alignment) remain unchanged.
> - **Commit:** `git add . && git commit -m "refactor: extract Forms and Layout to CSS modules (Phase 2)"`

---

### Phase 3: Home Page & Marketing Sections
Refactoring the landing page components to ensure the public-facing site remains visually perfect.

- [ ] **`src/components/sections/home/`**
  - [ ] `HeroSection.tsx` ➡️ `HeroSection.module.css`
  - [ ] `LeadSection.tsx` ➡️ `LeadSection.module.css`
  - [ ] `MetricsSection.tsx` ➡️ `MetricsSection.module.css`
  - [ ] `SpecialtiesSection.tsx` ➡️ `SpecialtiesSection.module.css`
  - [ ] `TestimonialsSection.tsx` ➡️ `TestimonialsSection.module.css`
  - [ ] `TimelineSection.tsx` ➡️ `TimelineSection.module.css`

- [ ] **`src/components/sections/shared/` & `content/`**
  - [ ] `WhatsAppFAB.tsx` ➡️ `WhatsAppFAB.module.css`
  - [ ] `NewsletterBanner.tsx` ➡️ `NewsletterBanner.module.css`
  - [ ] `TeamCard.tsx` ➡️ `TeamCard.module.css`

> [!TIP]
> **Phase 3 Testing & Commit Protocol**
> - Visual Check: Load the home page (`/`). Verify all sections are aligned, responsive design holds up, and animations/spacing are intact. Check the WhatsApp floating button and Newsletter banner.
> - **Commit:** `git add . && git commit -m "refactor: extract Home and Marketing sections to CSS modules (Phase 3)"`

---

### Phase 4: The Intern Portal & Internal Admin Tools
Refactoring the authenticated sections of the app (the portal and internal dashboards).

- [ ] **`src/components/portal/`**
  - [ ] `StatusTracker.tsx` ➡️ `StatusTracker.module.css`
  - [ ] `OnboardingChecklist.tsx` ➡️ `OnboardingChecklist.module.css`
  - [ ] `OfferCard.tsx` ➡️ `OfferCard.module.css`
  - [ ] `FileUploader.tsx` ➡️ `FileUploader.module.css`

- [ ] **`src/components/admin/` & `internal/`**
  - [ ] `UserRoleManager.tsx` ➡️ `UserRoleManager.module.css`
  - [ ] `AlumniActions.tsx` ➡️ `AlumniActions.module.css`
  - [ ] `AddPartnerForm.tsx` ➡️ `AddPartnerForm.module.css`
  - [ ] `LeaveActions.tsx` ➡️ `LeaveActions.module.css`

> [!TIP]
> **Phase 4 Testing & Commit Protocol**
> - Visual Check: Verify `/portal` and `/internal` routes. Ensure tables, action buttons, file uploaders, and status trackers render correctly.
> - **Commit:** `git add . && git commit -m "refactor: extract Portal and Admin tools to CSS modules (Phase 4)"`

---

### Phase 5: Page-Level Refactoring (`src/app/`)
Finally, we refactor the actual Next.js page files that glue the components together, replacing any lingering inline styles on `<div>` wrappers and `<main>` tags.

- [ ] **Public Pages**
  - [ ] `src/app/not-found.tsx`
  - [ ] `src/app/volunteer/page.tsx`

- [ ] **Portal Routes (`src/app/portal/`)**
  - [ ] `layout.tsx` (Portal Shell)
  - [ ] `page.tsx` (Portal Dashboard)
  - [ ] `offer/page.tsx`
  - [ ] `onboarding/page.tsx`
  - [ ] `status/page.tsx`
  - [ ] `withdraw/page.tsx`
  - [ ] `documents/page.tsx`

- [ ] **Internal Routes (`src/app/internal/`)**
  - [ ] `layout.tsx` (Admin Shell)
  - [ ] `page.tsx`
  - [ ] `projects/page.tsx`
  - [ ] `interns/page.tsx`
  - [ ] `reports/page.tsx`
  - [ ] `finance/page.tsx` (and sub-pages)
  - [ ] `docs/page.tsx`
  - [ ] `comms/page.tsx`
  - [ ] `ats/[id]/page.tsx`

> [!TIP]
> **Final Phase 5 Testing & Commit Protocol**
> - Full Application Build (`npm run build`).
> - Comprehensive visual click-through of the entire platform to ensure total parity.
> - Run a final search for `style={{` to confirm 100% removal.
> - **Commit:** `git add . && git commit -m "refactor: extract Page layouts to CSS modules (Phase 5)"`
> - **Push:** `git push origin refactor/css-modules-migration`
