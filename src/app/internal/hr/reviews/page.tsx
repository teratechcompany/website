import { requireRole }       from '@/lib/auth/guards'
import { ROLES }             from '@/constants/roles'
import dbConnect             from '@/lib/db/mongoose'
import { PerformanceReview } from '@/lib/db/models/PerformanceReview'

export default async function ReviewsPage() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const reviews = await PerformanceReview.find()
    .populate('userId','name').populate('reviewedBy','name')
    .sort({ createdAt:-1 }).lean() as any[]

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Performance Reviews</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>{reviews.length} reviews submitted</p>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <table className="data-table">
          <thead><tr><th>Intern</th><th>Period</th><th>Overall</th><th>Recommendation</th><th>Reviewed by</th></tr></thead>
          <tbody>
            {reviews.length === 0
              ? <tr><td colSpan={5} style={{ textAlign:'center', color:'var(--white-subtle)', padding:'var(--s40)' }}>No reviews yet</td></tr>
              : reviews.map(r => (
                <tr key={r._id}>
                  <td>{r.userId?.name ?? '—'}</td>
                  <td style={{ textTransform:'capitalize' }}>{r.period}</td>
                  <td style={{ color:'var(--brand-cyan)', fontWeight:600 }}>{r.overall}/100</td>
                  <td style={{ textTransform:'capitalize' }}><span className={`badge ${r.recommendation==='hire'?'badge-green':r.recommendation==='terminate'?'badge-red':'badge-blue'}`} style={{ fontSize:10 }}>{r.recommendation}</span></td>
                  <td style={{ color:'var(--white-muted)', fontSize:12 }}>{r.reviewedBy?.name ?? '—'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
