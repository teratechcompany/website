import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import { ROUTES }       from '@/constants/routes'
import dbConnect        from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import styles from './PortalPage.module.css'

export default async function PortalPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({ userId:(session.user as any).id }).sort({ createdAt:-1 }).lean()

  return (
    <div>
      <h1 className={styles.title}>Welcome back, {session.user.name.split(' ')[0]}</h1>
      <p className={styles.subtitle}>Your Tera-Tech internship portal</p>

      {app ? (
        <div className={`grid-2 ${styles.grid}`}>
          <div className="card">
            <p className={styles.cardHeader}>Application status</p>
            <p className={styles.statusValue}>{(app as any).status}</p>
            <Link href={ROUTES.PORTAL+'/status'} className="btn btn-ghost btn-sm">View full status →</Link>
          </div>
          <div className="card">
            <p className={styles.cardHeader}>Track</p>
            <p className={styles.trackValue}>{(app as any).track}</p>
            <p className={styles.dateText}>Applied {new Date((app as any).submittedAt ?? (app as any).createdAt).toLocaleDateString('en-CM', { dateStyle:'medium' })}</p>
          </div>
        </div>
      ) : (
        <div className={`card ${styles.emptyCard}`}>
          <h2 className={styles.emptyTitle}>No application yet</h2>
          <p className={styles.emptyText}>Submit your application to get started.</p>
          <Link href={ROUTES.APPLY} className="btn btn-orange">Apply now</Link>
        </div>
      )}
    </div>
  )
}
