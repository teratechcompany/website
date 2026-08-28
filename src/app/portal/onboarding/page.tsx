import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import { OnboardingChecklist } from '@/components/portal/OnboardingChecklist'
import styles from './OnboardingPage.module.css'

export default async function OnboardingPage() {
  await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Onboarding checklist</h1>
      <p className={styles.subtitle}>
        Complete these steps before your start date. Tick each item as you finish.
      </p>
      <OnboardingChecklist />
    </div>
  )
}
