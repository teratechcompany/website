import { requireRole }       from '@/lib/auth/guards'
import { ROLES }             from '@/constants/roles'
import dbConnect             from '@/lib/db/mongoose'
import { PerformanceReview } from '@/lib/db/models/PerformanceReview'
import styles from './ReviewsPage.module.css'

export default async function ReviewsPage() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const reviews = await PerformanceReview.find()
    .populate('userId','name').populate('reviewedBy','name')
    .sort({ createdAt:-1 }).lean() as any[]

  return (
    <div>
      <h1 className={styles.title}>Performance Reviews</h1>
      <p className={styles.subtitle}>{reviews.length} reviews submitted</p>
      <div className={`card ${styles.tableCard}`}>
        <table className="data-table">
          <thead><tr><th>Intern</th><th>Period</th><th>Overall</th><th>Recommendation</th><th>Reviewed by</th></tr></thead>
          <tbody>
            {reviews.length === 0
              ? <tr><td colSpan={5} className={styles.emptyState}>No reviews yet</td></tr>
              : reviews.map(r => (
                <tr key={r._id}>
                  <td>{r.userId?.name ?? '—'}</td>
                  <td className={styles.capitalize}>{r.period}</td>
                  <td className={styles.score}>{r.overall}/100</td>
                  <td className={styles.capitalize}><span className={`badge ${r.recommendation==='hire'?'badge-green':r.recommendation==='terminate'?'badge-red':'badge-blue'} ${styles.statusBadge}`}>{r.recommendation}</span></td>
                  <td className={styles.reviewer}>{r.reviewedBy?.name ?? '—'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
