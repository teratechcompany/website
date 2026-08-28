import { requireRole } from '@/lib/auth/guards'
import { ROLES }       from '@/constants/roles'
import styles          from './AssetsPage.module.css'

export default async function Page() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div>
      <h1 className={styles.title}>Asset Registry</h1>
      <p className={styles.subtitle}>Equipment and access cards assigned to interns and staff.</p>
      <div className={`card ${styles.emptyCard}`}>
        <p className={styles.emptyText}>This module is ready for data. Add records via the API or admin panel.</p>
      </div>
    </div>
  )
}
