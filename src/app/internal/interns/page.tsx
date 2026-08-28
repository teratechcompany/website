import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { Intern }       from '@/lib/db/models/Intern'
import styles from './InternsPage.module.css'

export default async function InternsPage() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const interns = await Intern.find({ status:'active' }).populate('userId', 'name email').sort({ startDate:-1 }).lean() as any[]

  return (
    <div>
      <h1 className={styles.title}>Active Interns</h1>
      <p className={styles.subtitle}>{interns.length} interns currently active</p>

      {interns.length === 0 ? (
        <div className={`card ${styles.emptyCard}`}>
          <p className={styles.emptyText}>No active interns. Accept applications in the ATS pipeline to onboard interns.</p>
          <Link href="/internal/ats" className={`btn btn-blue ${styles.atsLink}`}>Go to ATS →</Link>
        </div>
      ) : (
        <div className={`card ${styles.tableCard}`}>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Track</th><th>Cohort</th><th>Mentor</th><th>Start</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {interns.map(intern => (
                <tr key={intern._id}>
                  <td>{intern.userId?.name ?? '—'}</td>
                  <td className={styles.trackCell}>{intern.track}</td>
                  <td>{intern.cohort}</td>
                  <td className={styles.mutedCell}>{intern.mentor ?? '—'}</td>
                  <td className={styles.dateCell}>{new Date(intern.startDate).toLocaleDateString('en-CM',{ dateStyle:'short' })}</td>
                  <td><span className={`badge badge-green ${styles.statusBadge}`}>{intern.status}</span></td>
                  <td><Link href={`/internal/interns/${intern._id}`} className={styles.viewLink}>View →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
