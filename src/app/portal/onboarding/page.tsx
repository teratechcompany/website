import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import { OnboardingChecklist } from '@/components/portal/OnboardingChecklist'

export default async function OnboardingPage() {
  await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 24, fontWeight: 300, marginBottom: 'var(--s8)' }}>Onboarding checklist</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>
        Complete these steps before your start date. Tick each item as you finish.
      </p>
      <OnboardingChecklist />
    </div>
  )
}
