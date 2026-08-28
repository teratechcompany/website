import { requireRole } from '@/lib/auth/guards'
import { ROLES }       from '@/constants/roles'
import styles from '../../InternalPlaceholder.module.css'
export default async function Page() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div>
      <h1 className={styles.title}>Exit Interviews</h1>
      <p className={styles.subtitle}>Structured exit surveys for programme leavers.</p>
      <div className={`card ${styles.emptyCard}`}>
        <p className={styles.emptyText}>This module is ready for data. Add records via the API or admin panel.</p>
      </div>
    </div>
  )
}
