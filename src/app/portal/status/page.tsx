import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { Application }   from '@/lib/db/models/Application'
import { StatusTracker } from '@/components/portal/StatusTracker'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
import type { AppStatus } from '@/lib/db/models/Application'
import styles from './StatusPage.module.css'

export default async function StatusPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({ userId:(session.user as any).id }).sort({ createdAt:-1 }).lean()

  if (!app) return (
    <div className={styles.noAppContainer}>
      <h1 className={styles.noAppTitle}>No active application</h1>
      <Link href={ROUTES.APPLY} className="btn btn-orange">Apply now</Link>
    </div>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Application status</h1>
      <p className={styles.subtitle}>Track where you are in the process below.</p>
      <StatusTracker status={(app as any).status as AppStatus} />
    </div>
  )
}
